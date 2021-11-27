
import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export const CreateAccountDialog = (props) => {
    const { onClose, open, secret, onClick } = props;

    const handleClose = () => {
        onClose();
    };

    const handleClick = (v) => {
        navigator.clipboard.writeText(v);
        onClick();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>You are now a member!</DialogTitle>
            <Typography className="content" variant="subtitle1" component="div">
                Please keep this secret {secret} for the next time you come back.
            </Typography>

            <Box className="action-buttons">
                <Button color="tertiary" variant="text" onClick={() => handleClose()}>
                    cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => handleClick(secret)}
                >
                    Cool
                </Button>
            </Box>

        </Dialog>
    );
}
