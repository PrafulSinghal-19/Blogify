import React from 'react'

const BlogImage = ({ imageUrl = null }) => {

    imageUrl = imageUrl || 'src/assets/addImage.png';
    return (
        <img src={imageUrl} alt="preview" className='rounded-xl hover:cursor-pointer max-h-64' />
    )
}

export default BlogImage