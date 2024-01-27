import React from 'react'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = (props) => {
  const authStatus = useSelector(state => state.auth.userStatus);
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{mt:10, mb:5}}>
      {'Copyright © '}
      <Link color="inherit" to={authStatus ? '/' : '#'} className='hover:cursor-pointer text-sky-500 underline'>
        Blogify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Footer