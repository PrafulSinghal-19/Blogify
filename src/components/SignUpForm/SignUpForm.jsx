import React, { useState } from 'react';
import { Input, SubmitBtn, UploadFile, ProfileImage, PasswordInput } from "../index"
import { useForm } from "react-hook-form"
import CssBaseline from '@mui/material/CssBaseline';;
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { login } from "../../store/authSlice";
import authService from "../../appwrite/auth"
import userAuth from '../../appwrite/auth';

const defaultTheme = createTheme();

export default function SignUpForm() {

  const [fileDataURL, setFileDataURL] = useState(null)

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const user = await authService.signup({ ...data });
      dispatch(login(user));
    }
    catch (error) {
      console.log(error.message);
      try {
        await userAuth.logout();
      }
      catch (error) {
        console.log(error.message);
      }
    }
  };

  const { handleSubmit, control, register, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userImage: []
    }
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <label htmlFor="file">
            <UploadFile setFileDataURL={setFileDataURL} {...register('userImage')} />
            <ProfileImage imageUrl={fileDataURL} />
          </label>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }} autoComplete='off'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input name='firstName' id='firstName' label='First Name' autoFocus={true} control={control} errors={errors} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input name='lastName' id='lastName' label='Last Name' control={control} errors={errors} />
              </Grid>
              <Grid item xs={12}>
                <Input name='email' id='email' label='Email' type='email' control={control} errors={errors} />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput name='password' id='password' label='Password' control={control} errors={errors} />
              </Grid>
            </Grid>
            <SubmitBtn text='SignUp' />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2" color="primary">
                  <Link to="/login">
                    Already have an account? Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}