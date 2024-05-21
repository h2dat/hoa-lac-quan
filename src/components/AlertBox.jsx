import React from "react";
import { Dialog, DialogContent, DialogTitle, Button } from '@material-ui/core'

const AlertDialog = ({ open, onClose, title, message }) => {

    return (
        <Dialog open={open} maxWidth="md" onClose={onClose}>
            <DialogTitle className="dialog-title">{title}</DialogTitle>
            <DialogContent dividers >
                {message}
            </DialogContent>
            <Button onClick={onClose} >
                Close
            </Button>
        </Dialog>
    );
};
export default AlertDialog;
