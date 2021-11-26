import React, { useState } from "react";
import Container from "@mui/material/Container";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useNavigate } from 'react-router-dom';

import "./JoinRoom.scss";

export const JoinRoom = () => {
  const [userPref, setUserPref] = useState({});
  let navigate = useNavigate();

  //add more languages
  const languages = [
    { label: "Romanian", value: "ro-RO" },
    { label: "English", value: "en-US" },
    { label: "English (UK)", value: "en-UK" },
  ];
  const topics = ["#sarmale", "#mici", "#traditional"];
  const userCreator = "LaraMadalina";
  const code = "EwssvrFG";

  const handleClick = (v) => {
    navigate('/chat')
  };

  return (
    <Box pt={10}>
      <Typography sx={{ fontSize: 17 }} align="center" gutterBottom>
        You’re preparing to enter in room {code} created by {userCreator}
      </Typography>
      <Stack direction="column" spacing={1} p={4}>
      <Typography sx={{ fontSize: 14 }} align="center" gutterBottom>
        Topics discussed
      </Typography>
      <Stack direction="row" spacing={1} justifyContent="center">
        {topics.map((topic) => (
          <Chip color="secondary" key={topic} label={topic} variant="outlined" />
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
                    return { ...prev, spokenLanguage: newValue?.value };
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
                    return { ...prev, translateLanguage: newValue?.value };
                  })
                }
              />
            </Box>
          </Box>
          <Box p={2}>
            <Button  variant="contained" onClick={() => handleClick()}>
              Join room
            </Button>
          </Box>
        </div>
      </Container>
    </Box>
  );
};
