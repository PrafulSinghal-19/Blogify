import React from 'react'

const ProfileImage = ({ imageUrl = null }) => {
    
    const dim = imageUrl ? 150 : 70;

    imageUrl = imageUrl || 'src/assets/user.png';
    return (
        <img src={imageUrl} alt="preview" className={`rounded-full h-[${dim}px] w-[${dim}px] mb-4`}/>
    )
}

export default ProfileImage