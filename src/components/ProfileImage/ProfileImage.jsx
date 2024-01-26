import React from 'react'
import userImage from "../../assets/user.png";

const ProfileImage = ({ imageUrl = null }) => {
    
    const dim = imageUrl ? "150px" : "100px";

    imageUrl = imageUrl || userImage;
    return (
        <img src={imageUrl} alt="preview" className={`rounded-full mb-4 hover:cursor-pointer`} style={{ height: dim, width: dim}} />
    )
}

export default ProfileImage