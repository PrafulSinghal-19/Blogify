import React from 'react'
import addImage from "../../assets/addImage.png";

const BlogImage = ({ imageUrl = null }) => {

    imageUrl = imageUrl || addImage;
    return (
        <img src={imageUrl} alt="preview" className='rounded-xl hover:cursor-pointer max-h-64' />
    )
}

export default BlogImage