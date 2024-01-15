import * as React from 'react';
import { Input, SubmitBtn, ProfileImage } from "../index"
import { useForm } from "react-hook-form"
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function LoginForm() {

  const onSubmit = (data) => {
    console.log(data)
  };

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
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
          <ProfileImage />
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input name='email' id='email' label='Email' type='email' control={control} errors={errors} />
              </Grid>
              <Grid item xs={12}>
                <Input name='password' id='password' label='Password' type='password' control={control} errors={errors} />
              </Grid>
            </Grid>
            <SubmitBtn text="Login" />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? SignUp
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}