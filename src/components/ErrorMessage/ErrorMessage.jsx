import { Typography } from '@mui/material'
import React from 'react'

const ErrorMessage = ({ error, color }) => {
    if (error) {
        return(<Typography color={color} variant="box2" sx={{textAlign:'center'}}>{error}</Typography>)
    }
    return <></>
}

export default ErrorMessage