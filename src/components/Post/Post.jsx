import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom'
import postServices from "../../appwrite/postServices"
import { Container, Typography, Box, IconButton, Divider } from '@mui/material';
import { ErrorMessage, PostForm, ModalComponent } from "../index"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AspectRatio } from '@mui/joy';
import { sanitize } from "html-parser";
import ReactHtmlParser from "react-html-parser";
import { deletePost } from '../../store/postSlice';

const Post = () => {
  const { id } = useParams();
  const posts = useSelector(state => state.post.posts);
  const [post, setPost] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.auth.user);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async() => {
    try {
      await postServices.deleteDocument(post.$id, post.featuredImage);
      dispatch(deletePost(post.$id));
      handleClose();
      navigate('/');
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (post && post.featuredImage) {
      setImage('');
      postServices.getImagePreview(post.featuredImage)
        .then((image) => { setImage(image) })
        .catch((error) => { console.log(error.message) });
    }
  }, [post]);

  useEffect(() => {
    const post = posts.find(post => post.$id == id);
    if (!post) {
      (async () => {
        try {
          const post = await postServices.getPost(id);
          setPost(post);
        } catch (error) {

          setError(error.message);
        }
      })();
    } else {
      setPost(post);
    }
  }, [posts])

  return (
    <Container sx={{ my: '4vh' }}>
      {
        error &&
        <>
          <ErrorMessage error={error} />
          <Typography>
            Go Back To
            <Link to="/">
              Home Page
            </Link>
          </Typography>
        </>
      }

      {
        !error && !edit && post &&
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '1vh' }}>

            <IconButton color='error' size="small" children={<DeleteIcon />} sx={{
              '&:hover': {
                backgroundColor: '#D04848',
                color: 'white'
              }
            }}
              onClick={handleOpen}
              disabled={user.$id != post.userId}
            />
            <IconButton color='success' size='small' children={<EditIcon />} sx={{
              ml: 2,
              '&:hover': {
                color: 'white',
                backgroundColor: '#43766C'
              }
            }}
              onClick={() => setEdit(true)}
              disabled={user.$id != post.userId}
            />

          </Box>

          <ModalComponent open={open} handleClose={handleClose} handleDelete={handleDelete}/>

          <Typography variant='h4' sx={{ textAlign: 'center' }}>
            {post.title}
          </Typography>

          <Divider sx={{ boxShadow: 1 }} />

          <Typography color='text.secondary' sx={{ textAlign: 'right', mb: '4vh', fontSize: '15px', fontStyle: 'italic' }}>
            {post.userName}
          </Typography>

          {image &&
            <AspectRatio flex ratio='1' maxHeight={300}
              objectFit='contain' sx={{ maxWidth: '300', mx: 'auto', mb: '4vh' }}>
              <img src={image} className='shadow-lg rounded-md object-fit' />
            </AspectRatio>
          }

          <Typography>
            {
              ReactHtmlParser(sanitize(post['content'], {
                elements: ['script'],
                attributes: ['onClick'],
                comments: true
              }))
            }
          </Typography>
        </Box>
      }
      {!error && edit && post && <PostForm post={post} image={image} setEdit={setEdit} />}
    </Container >
  )

}

export default Post