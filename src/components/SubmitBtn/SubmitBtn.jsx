import React from 'react'
import Button from '@mui/material/Button';

const SubmitBtn = ({text, ...props}) => {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            {...props}
        >
            {text}
        </Button>
    )
}

export default SubmitBtn