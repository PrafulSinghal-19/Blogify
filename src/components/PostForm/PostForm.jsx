import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Typography, createTheme, Container, Box, Radio } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { purple, red } from '@mui/material/colors';
import { BlogImage, Input, UploadFile, RadioBtn, SubmitBtn, RTE, ErrorMessage } from '../index';
import postServices from '../../appwrite/postServices';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../../store/postSlice';

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: red
  }
})

const PostForm = ({ post }) => {

  const [fileDataURL, setFileDataURL] = useState(null)
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      featuredImage: [],
      status: true
    }
  });

  const onSubmit = async(data) => {
    try {
      data['status'] = (data['status'] === 'true' ? true : false);
      const post = await postServices.createPost({ ...data }, user.$id, user.name);
      if (data['status']) dispatch(addPost(post));
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Container sx={{ marginTop: '5vh' }}>
          <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: '2vh' }}>
            {post ? 'Edit Blog' : 'Create Blog'}
          </Typography>
          <Input name="title" id="title" label="Title" control={control} errors={errors} autoFocus={true} sx={{ marginBottom: '2vh' }} />
          <RTE name="content" control={control} label="Content" />
          <ErrorMessage error={errors['content']?.message} />
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', marginBottom: '7vh', marginTop:'5vh'}}>
            <label htmlFor="file" className="md:w-1/6 sm:w-1/2">
              <UploadFile setFileDataURL={setFileDataURL} {...register('image')} />
              <Typography variant='body1' color='text.secondary' sx={{textAlign:'center'}}>Add Image</Typography>
              <BlogImage imageUrl={fileDataURL} />
            </label>
            <RadioBtn name="status" control={control} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <SubmitBtn text='Submit' sx={{ maxWidth: '150px' }} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default PostForm