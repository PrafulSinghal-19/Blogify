import React from 'react'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{mt:10}}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Blogify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Footer