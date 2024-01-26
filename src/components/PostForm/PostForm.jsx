import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { Typography, createTheme, Container, Box, Button } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { purple, red } from '@mui/material/colors';
import { BlogImage, Input, UploadFile, RadioBtn, SubmitBtn, RTE, ErrorMessage } from '../index';
import postServices from '../../appwrite/postServices';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, deletePost, updatePost } from '../../store/postSlice';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: red
  }
})

const PostForm = ({ post, setEdit, image }) => {
  const [fileDataURL, setFileDataURL] = useState(null)
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fileDataURL) {
      setFileDataURL(image);
    }
  }, [image])

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      featuredImage: [],
      status: (post?.status)?.toString() || "true"
    }
  });

  const onSubmit = async (data) => {
    if (!post) {
      try {
        data['status'] = (data['status'] === 'true' ? true : false);
        const post = await postServices.createPost({ ...data }, user.$id, user.name);
        if (data['status']) {
          dispatch(addPost(post));
          navigate(`/post/${post.$id}`);
        }
        else {
          navigate('/');
        }
      }
      catch (error) {
        console.log(error.message);
      }
    }
    else {
      try {
        data['status'] = (data['status'] === 'true' ? true : false);
        const updatedPost = await postServices.updateDocument({ ...data }, post.$id, post);
        if (data['status']) {
          dispatch(updatePost(updatedPost));
        }
        else {
          dispatch(deletePost(updatedPost))
          navigate('/');
        }
        setEdit(false);
      }
      catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Container sx={{ marginTop: '5vh' }}>
          <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: '2vh' }}>
            {post ? 'Edit Blog' : 'Create Blog'}
          </Typography>
          <Input name="title" id="title" label="Title" control={control} errors={errors} autoFocus={true} defaultValue={watch('title')} sx={{ marginBottom: '2vh' }} />
          <RTE name="content" control={control} label="Content" defaultValue={watch('content')} />
          <ErrorMessage error={errors['content']?.message} />
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', marginBottom: '7vh', marginTop: '5vh' }}>
            <label htmlFor="file" className="md:w-1/6 sm:w-1/2">
              <UploadFile setFileDataURL={setFileDataURL} {...register('image')} />
              <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'center' }}>Add Image</Typography>
              <BlogImage imageUrl={fileDataURL} />
            </label>
            <RadioBtn name="status" control={control} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <SubmitBtn text={post ? 'Edit' : 'Submit'} sx={{ maxWidth: '150px' }} />
            {post && <Button color='error' variant="contained" sx={{ maxWidth: '150px', ml: 2 }} onClick={() => setEdit(false)}>Cancel</Button>}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default PostForm