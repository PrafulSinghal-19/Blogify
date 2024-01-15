import * as React from 'react';
import { Input } from "../index"
import { SubmitBtn } from '../index'
import { useForm } from "react-hook-form"
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';;
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function SignUpForm() {
  
  const onSubmit = (data) => {
    console.log(data)
    };
    
    const { handleSubmit, control, formState: {errors} } = useForm({
        defaultValues: {
          firstName: "",
          lastName: "",
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input name='firstName' id='firstName' label='First Name' control={control} errors={errors} />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Input name='lastName' id='lastName' label='Last Name' control={control} errors={errors} />
              </Grid>
              <Grid item xs={12}>
              <Input name='email' id='email' label='Email' type='email' control={control} errors={errors} />
              </Grid>
              <Grid item xs={12}>
              <Input name='password' id='password' label='Password' type='password' control={control} errors={errors} />
              </Grid>
            </Grid>
            <SubmitBtn text='SignUp' />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}