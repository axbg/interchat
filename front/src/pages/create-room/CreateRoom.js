import React from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'

import "./CreateRoom.scss";

export const CreateRoom = () => {
  // const [room, setRoom] = useState({});
  const [open, setOpen] = React.useState(false);

  const languages = [
    { label: "Romanian", value: "ro-RO" },
    { label: "English", value: "en-US" },
    { label: "English (UK)", value: "en-UK" },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <Container className="create-room-container">
      <div className="form">
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Chat name</InputLabel>
          <Input
            id="component-simple"
            onChange={(e) => {
              console.log(e);
            }}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Enter Topics</InputLabel>
          <Input
            id="component-simple"
            onChange={(e) => {
              console.log(e);
            }}
          />
        </FormControl>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={languages}
          sx={{ width: 240 }}
          renderInput={(params) => (
            <TextField {...params} label="I am going to speak" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={languages}
          sx={{ width: 240 }}
          renderInput={(params) => (
            <TextField {...params} label="I want translation in" />
          )}
        />
        <Button variant="contained" onClick={handleClickOpen}>
          Join room
        </Button>
        <ConfirmationDialog open={open} onClose={handleClose} />
      </div>
    </Container>
  );
};

function ConfirmationDialog(props) {
  const { onClose, open } = props;
  const code = "CDC3ce44"

  const handleClose = () => {
    onClose();
  };

  const handleCopyClick = (v) => {
    navigator.clipboard.writeText(v);

  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle >You created a room! </DialogTitle>
      <Typography className="content" variant="subtitle1" component="div">
        Share this code with your friends to join! {code}
      </Typography>

      <Box className="action-buttons">
      <Button color="tertiary" variant="text" onClick={() => handleClose()}>
        cancel
      </Button>
      <Button component={Link}  to="/chat" variant="contained" onClick={() => handleCopyClick(code)}>
        Copy Code and enter room
      </Button>
      </Box>
    </Dialog>
  );
}
