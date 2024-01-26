import * as React from 'react';
import {Box, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalComponent({ open, handleClose, handleDelete }) {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{...style, textAlign: 'center'}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="error">
                        Confirmation
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 1.5 }}>
                        Are you sure you want to delete this blog?
                    </Typography>
                    <Button size="small" color="error" variant="contained" onClick={handleDelete}>Delete</Button>
                </Box>
            </Modal>
        </div>
    );
}