import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { CircularProgress } from '@mui/material'
import { useNavigate, useLocation } from 'react-router';
import _ from 'lodash';
import "./JoinRoom.scss";
import axios from "axios";

export const JoinRoom = (props) => {
  const [userPref, setUserPref] = useState({});
  const [room, setRoom] = useState({});
  let navigate = useNavigate();
  const { state } = useLocation();
  const token = localStorage.getItem('token');
  console.log(state);
  const [loading, setLoading] = useState(true);

  //add more languages
  const languages = [
    { label: "Romanian", value: "ro-RO" },
    { label: "English", value: "en-US" },
    { label: "English (UK)", value: "en-UK" },
    { label: "Francais", value: "fr-FR" },
    { label: "Italiano", value: 'it-IT' },
    { label: "Magyar", value: 'it-IT' },
    { label: "Nederlands", value: 'nl-NL' },
    { label: "Slovenčina", value: 'sk-SK' },
    { label: "Español", value: 'es-ES' },
    { label: "Deutsch", value: 'de-DE' },
  ];

  const handleClick = (v) => {
      axios.put('http://localhost:8080/api/user', userPref, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then(() => {
        axios.post('http://localhost:8080/api/room/join', { id: state.room.id }, {
          headers: { "Authorization": `Bearer ${token}` }
        }).then(res => {
          const connectedUsers = res.data.message.roomDetails[0].Users;
          const currentTags = res.data.message.roomDetails[0].tags;
          const name = res.data.message.roomDetails[0].name;
          navigate('/chat', { state: { room: state?.room, connectedUsers, currentTags, name} });
        })
      });
  };

  useEffect(() => {
    if (_.isEmpty(state)) {
      return;
    }
    setLoading(true);
    if (state.createdInfo) {
      console.log('get info about room')
      axios.get('http://localhost:8080/api/room', {
        headers: { "Authorization": `Bearer ${token}` }
      }).then(res => {

        const roomFound = res?.data?.message.filter(item => item.id === state?.createdInfo?.RoomId)
        console.log(roomFound[0]);
        const foundRoom = {
          ...roomFound[0],
          tags: roomFound[0]?.tags.split('#')
        }
        setRoom(foundRoom);
        setLoading(false)
      })
    } else {
      setRoom(state?.room);
      setLoading(false)

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <Box pt={10}>
        <CircularProgress />
      </Box>
    )
  }
  return (

    <Box pt={10}>
      <Typography sx={{ fontSize: 17 }} align="center" gutterBottom>
        You’re preparing to enter in room {room?.name}
      </Typography>
      <Stack direction="column" spacing={1} p={4}>
        <Typography sx={{ fontSize: 14 }} align="center" gutterBottom>
          Topics discussed
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          {room?.tags?.map((topic) => (
            <Chip color="secondary" key={topic} label={`#${topic}`} variant="outlined" />
          ))}
        </Stack>

      </Stack>
      <Container>
        <div className="form">
          <Box p={2}>
            <Typography sx={{ fontSize: 17 }} align="center" gutterBottom>
              Let us know your preferences
            </Typography>
            <Box p={2}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={languages}
                sx={{ width: 240 }}
                renderInput={(params) => (
                  <TextField {...params} label="I am going to speak" />
                )}
                onChange={(event, newValue) =>
                  setUserPref((prev) => {
                    return { ...prev, 'input_lang': newValue?.value };
                  })
                }
              />
            </Box>
            <Box p={2}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={languages}
                sx={{ width: 240 }}
                renderInput={(params) => (
                  <TextField {...params} label="I want translation in" />
                )}
                onChange={(event, newValue) =>
                  setUserPref((prev) => {
                    return { ...prev, 'output_lang': newValue?.value };
                  })
                }
              />
            </Box>
          </Box>
          <Box p={2}>
            <Button variant="contained" onClick={() => handleClick()}>
              Join room
            </Button>
          </Box>
        </div>
      </Container>
    </Box>
  );
};
