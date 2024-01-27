import { useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { Typography } from '@mui/material';
import postServices from '../../appwrite/postServices';
import { useNavigate } from 'react-router-dom';
import { sanitize } from "html-parser";
import { htmlToText } from "html-to-text";

export default function PostCard({ post }) {

  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (post.featuredImage) {
      postServices.getImagePreview(post.featuredImage)
        .then((image) => {
          setImage(image.href);
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }, []);

  return (
    <Card
      orientation="horizontal"
      variant="soft"
      color="neutral"
      sx={{
        width: '95%',
        flexWrap: 'wrap',
        resize: 'horizontal',
        mt: 5,
        mx: 'auto',
        '&:hover': {
          cursor: 'pointer',
          position: 'relative',
          top: '-4px',
          scale: '1.02'
        }
      }}
      onClick={() => {
        navigate(`/post/${post.$id}`)
      }}
    >
      <AspectRatio flex ratio="1" maxHeight={182} objectFit='contain' sx={{ minWidth: 182, my: 'auto' }}>
        {image ? <img
          src={image}
          alt="Featured Image"
          className='object-contain'
        /> : <></>}
      </AspectRatio>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5' fontWeight="bold" sx={{ textAlign: 'center' }}>
          {post.title}
        </Typography>
        <Typography level="body-md" sx={{ marginBottom: '15px' }}>
          {
            `${htmlToText(post.content).slice(0,100)} ...`
          }
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'right' }}>
          Author: {post.userName}
        </Typography>
      </CardContent>
    </Card>
  );
}