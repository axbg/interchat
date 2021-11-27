import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import "./CreateRoom.scss";

export const ConfirmationDialog = (props) => {
    const { onClose, open, onClick } = props;
    const code = "CDC3ce44";

    const handleClose = () => {
        onClose();
    };

    const handleClick = (v) => {
        navigator.clipboard.writeText(v);
        onClick();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>You created a room! </DialogTitle>
            <Typography className="content" variant="subtitle1" component="div">
                Share this code with your friends to join! {code}
            </Typography>

            <Box className="action-buttons">
                <Button color="tertiary" variant="text" onClick={() => handleClose()}>
                    cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => handleClick(code)}
                >
                    Copy Code and enter room
                </Button>
            </Box>
        </Dialog>
    );
}
