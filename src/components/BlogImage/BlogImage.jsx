import React from 'react'
import addImage from "../../assets/addImage.png";

const BlogImage = ({ imageUrl = null }) => {

    imageUrl = imageUrl || addImage;
    return (
        <img src={imageUrl} alt="preview" className='rounded-md hover:cursor-pointer max-h-56' />
    )
}

export default BlogImage