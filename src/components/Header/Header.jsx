import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

import blogHeaderImage from "../../assets/blogHeaderImage.png";
import userImage from "../../assets/user.png";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null | HTMLElement)
  const [anchorElUser, setAnchorElUser] = useState(null | HTMLElement);
  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState([]);
  const [image, setImage] = useState(userImage);
  const authStatus = useSelector(state => state.auth.userStatus);
  const user = useSelector(state => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => { 
    if (authStatus) {
      try {
        (async () => {
          const image = await authService.getImagePreview(user.$id);
          if (image) setImage(image.href);
        })();
      }
      catch (error) {
        console.log(error.message);
      }

      setPages([
        {
          page: 'Home',
          route: '/'
        },
        {
          page: 'New Blogs',
          route: '/createBlog'
        }
      ]);
      setSettings([
        {
          page: 'Dashboard',
          route: '/userInfo'
        },
        {
          page: 'Logout',
          route: '/login'
        }
      ]);
    }
    else {
      setImage(userImage);
      
      setPages([
        {
          page: 'Login',
          route: '/login'
        },
        {
          page: 'Signup',
          route: '/signup'
        }
      ]);

      setSettings([
        {
          page: 'Login',
          route: '/login'
        },
        {
          page: 'Signup',
          route: '/signup'
        }
      ]);
    }
  }, [authStatus]);

  const dispatch = useDispatch();

  const handleLogout = async() => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/login');
    }
    catch (error) {
      console.log(error.message)
    }
    
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={blogHeaderImage} className='h-12' />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to={authStatus ? '/' : '#'}>
              Blogify
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link to={page.route}>{page.page}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to={authStatus ? '/' : '#'}>
              Blogify
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.route}>{page.page}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.page} onClick={() => {
                  handleCloseUserMenu();
                  setting.page === 'Logout' && handleLogout();
                }}>
                  <Typography textAlign="center"><Link to={setting.route}>{setting.page}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
