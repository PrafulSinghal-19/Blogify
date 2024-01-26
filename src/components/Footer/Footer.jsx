import React from 'react'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{mt:10, mb:5}}>
      {'Copyright © '}
      <Link color="inherit" to="/" className='hover:cursor-pointer'>
        Blogify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Footer