import { useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { Typography } from '@mui/material';
import postServices from '../../appwrite/postServices';

export default function PostCard({ post }) {

  const [image, setImage] = useState('');

  useEffect(() => {
    if (post.featuredImage) {
      (async () => {
        try {
          const image = await postServices.getImagePreview(post.featuredImage);
          setImage(image.href);
        }
        catch (error) {
          console.log(error.message);
        }        
      })()
    }
  }, []);

  return (
    <Card
      orientation="horizontal"
      sx={{
        width: '95%',
        flexWrap: 'wrap',
        resize: 'horizontal',
        mt: 5,
        mx: 'auto',
      }}
    >
      <AspectRatio flex ratio="1" sx={{ minWidth: 140, maxHeight: 140, my: 'auto' }}>
        {image ? <img
          src={image}
          alt="Featured Image"
        /> : <></>}
      </AspectRatio>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5' fontWeight="bold" sx={{ textAlign: 'center' }}>
          {post.title}
        </Typography>
        <Typography level="body-md" sx={{marginBottom: '15px'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi earum mollitia animi ea deleniti unde sapiente accusantium culpa et numquam, in maiores ipsam incidunt corrupti adipisci fugit reprehenderit excepturi rerum rem reiciendis perspiciatis! Expedita minus magnam itaque odit nihil veritatis, soluta provident qui at accusantium labore dignissimos odio dolorem, atque reiciendis? Tempora cupiditate quam, velit aliquid nostrum molestias sunt officiis ab delectus numquam illum error fuga iusto sequi voluptatibus. Dolorem perferendis non sequi ab hic, nostrum, consequuntur id deleniti porro dolorum numquam libero mollitia accusamus totam labore vero cupiditate provident modi laboriosam fugiat saepe, ipsam quisquam! Nam aliquid voluptate dolorem.
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'right' }}>
          Author: {post.userName}
        </Typography>
      </CardContent>
    </Card>
  );
}