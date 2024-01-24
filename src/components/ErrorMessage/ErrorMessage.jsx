import { Typography } from '@mui/material'
import React from 'react'

const ErrorMessage = ({ error }) => {
    if (error) {
        return(<Typography color="secondary" sx={{textAlign:'center'}}>{error}</Typography>)
    }
    return <></>
}

export default ErrorMessage