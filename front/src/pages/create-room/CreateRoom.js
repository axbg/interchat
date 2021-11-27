import React, { useState, useEffect } from "react";
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
import { ConfirmationDialog } from './ConfirmationDialog'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./CreateRoom.scss";

export const CreateRoom = () => {
  const [room, setRoom] = useState({ public: false });
  const [open, setOpen] = useState(false);
  const [createdInfo, setCreatedInfo] = useState({});
  let navigate = useNavigate();

  const token = localStorage.getItem('token');
  const handleChange = (event) => {
    setRoom((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.checked,
      };
    });
  };

  const handleClickOpen = () => {
    axios.post('http://localhost:8080/api/room', room, {
      headers: { "Authorization": `Bearer ${token}` }
    }).then(res => {
      console.log(res?.data?.message[0])
      setCreatedInfo(res?.data?.message[0])
      setOpen(true);
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tags = [
    { title: "romanianMusic", year: 1994 },
    { title: "bucharest", year: 1972 },
    { title: "foodLover", year: 1974 },
    { title: "historicalBuildings", year: 2008 },
    { title: "romanianHabits", year: 1957 },
    { title: "speakRomanian", year: 1993 },
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
                return { ...prev, name: e.target.value };
              })
            }
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: 300 }}>

          <TextField
            id="standard-textarea"
            label="Description"
            placeholder="Learn now or never"
            maxRows={2}
            multiline
            variant="standard"
            onChange={(e) =>
              setRoom((prev) => {
                return { ...prev, description: e.target.value };
              })
            }
          />
        </FormControl>
        <Stack spacing={1} sx={{ width: 300 }}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={tags}
            getOptionLabel={(option) => `#${option.title}`}
            onChange={(event, value) => {
              console.log(value)
              const joinedValues = value.map(item => item.title).join('#');
              setRoom((prev) => { return { ...prev, tags: joinedValues } })
            }}
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
              name="public"
            />
          }
          label="Private Room"
          labelPlacement="start"
        />
        <FormControl variant="standard" sx={{ width: 300 }}>
          <InputLabel htmlFor="component-simple">Image link</InputLabel>
          <Input
            id="component-simple"
            onChange={(e) =>
              setRoom((prev) => {
                return { ...prev, picture: e.target.value };
              })
            }
          />
        </FormControl>
        <Box p={2}>
          <Button variant="contained" onClick={handleClickOpen}>
            Create room
          </Button>
        </Box>
      </div>
      <ConfirmationDialog open={open} onClose={handleClose} createdInfo={createdInfo} onClick={() => {
        console.log(createdInfo)
        navigate('/join-room', { state: { createdInfo: createdInfo } })
      }} />
    </Box>
  );
};

