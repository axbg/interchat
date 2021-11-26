import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from 'react-router-dom';

import "./CreateRoom.scss";

export const CreateRoom = () => {
  const [room, setRoom] = useState({});
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setRoom((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.checked,
      };
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tags = [
    { title: "#romanianMusic", year: 1994 },
    { title: "#bucharest", year: 1972 },
    { title: "#foodLover", year: 1974 },
    { title: "#historicalBuildings", year: 2008 },
    { title: "#romanianHabits", year: 1957 },
    { title: "#speakRomanian", year: 1993 },
  ];

  return (
    <Box pt={30}>
      <div className="form">
        <Typography sx={{ fontSize: 17 }} align="center" gutterBottom>
          You’re creating a room. Nice!
        </Typography>
        <FormControl variant="standard" sx={{ width: 300 }}>
          <InputLabel htmlFor="component-simple">Chat name</InputLabel>
          <Input
            id="component-simple"
            onChange={(e) =>
              setRoom((prev) => {
                return { ...prev, chatName: e.target.value };
              })
            }
          />
        </FormControl>
        <Stack spacing={1} sx={{ width: 300 }}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={tags}
            getOptionLabel={(option) => option.title}
            defaultValue={[tags[0]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Exter topics"
                placeholder="Favorites"
              />
            )}
          />
        </Stack>
        <FormControlLabel
          value="start"
          control={
            <Switch
              color="primary"
              onChange={handleChange}
              name="privateRoom"
            />
          }
          label="Private Room"
          labelPlacement="start"
        />
        <Box p={2}>
          <Button variant="contained" onClick={handleClickOpen}>
            Create room
          </Button>
        </Box>
      </div>
      <ConfirmationDialog open={open} onClose={handleClose} />
    </Box>
  );
};

function ConfirmationDialog(props) {
  const { onClose, open } = props;
  const code = "CDC3ce44";
  let navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleClick = (v) => {
    navigator.clipboard.writeText(v);
    navigate('/join-room')
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
