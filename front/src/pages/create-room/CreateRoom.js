import React, { useState } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import './CreateRoom.scss';

export const CreateRoom = () => {
    const [room, setRoom] = useState({});

    const handleChange = (event) => {
        setRoom((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.checked,
            }
        });
    };

    const createRoom = () => {
        console.log(room);
    }

    const tags = [{ title: '#romanianMusic', year: 1994 },
    { title: '#bucharest', year: 1972 },
    { title: '#foodLover', year: 1974 },
    { title: '#historicalBuildings', year: 2008 },
    { title: '#romanianHabits', year: 1957 },
    { title: "#speakRomanian", year: 1993 },
    ];

    return (
        <Box m={5}>
            <Container>
                <div className='form'>
                    <Typography sx={{ fontSize: 17 }} align="center" gutterBottom>
                        You’re creating a room. Nice!
                    </Typography>
                    <FormControl variant="standard" sx={{ width: 300 }}>
                        <InputLabel htmlFor="component-simple">Chat name</InputLabel>
                        <Input id="component-simple" onChange={(e) => setRoom(prev => { return { ...prev, chatName: e.target.value } })} />
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
                        control={<Switch color="primary" onChange={handleChange} name='privateRoom' />}
                        label="Private Room"
                        labelPlacement="start"

                    />
                    <Box p={2}>
                        <Button variant="contained" onClick={createRoom}>Create room</Button>
                    </Box>
                </div>

            </Container>
        </Box>
    )
}