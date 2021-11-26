import React, { useState } from 'react';
import Container from '@mui/material/Container';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import './JoinRoom.scss';

export const JoinRoom = () => {
    const [userPref, setUserPref] = useState({});

    //add more languages
    const languages = [
        { label: 'Romanian', value: 'ro-RO' },
        { label: 'English', value: 'en-US' },
        { label: 'English (UK)', value: 'en-UK' },

    ]

    const joinRoom = () => {
        console.log(userPref);
    }

    return (
        <Box m={5}>
            <Container>
                <div className='form'>

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
                                renderInput={(params) => <TextField {...params} label="I am going to speak" />}
                                onChange={(event, newValue) => setUserPref(prev => { return { ...prev, spokenLanguage: newValue?.value } })}
                            />
                        </Box>
                        <Box p={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={languages}
                                sx={{ width: 240 }}
                                renderInput={(params) => <TextField {...params} label="I want translation in" />}
                                onChange={(event, newValue) => setUserPref(prev => { return { ...prev, translateLanguage: newValue?.value } })}

                            />
                        </Box>
                    </Box>
                    <Box p={2}>
                        <Button variant="contained" onClick={joinRoom}>Join room</Button>
                    </Box>
                </div>

            </Container>
        </Box>
    )
}