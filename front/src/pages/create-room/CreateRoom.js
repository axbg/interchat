import React from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import './CreateRoom.scss';

export const CreateRoom = () => {
    // const [room, setRoom] = useState({});
    const languages = [
        { label: 'Romanian', value: 'ro-RO' },
        { label: 'English', value: 'en-US' },
        { label: 'English (UK)', value: 'en-UK' },

    ]
    return (
        <Container className='create-room-container'>
            <div className='form'>
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Chat name</InputLabel>
                    <Input id="component-simple" onChange={(e) => { console.log(e) }} />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Enter Topics</InputLabel>
                    <Input id="component-simple" onChange={(e) => { console.log(e) }} />
                </FormControl>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={languages}
                    sx={{ width: 240 }}
                    renderInput={(params) => <TextField {...params} label="I am going to speak" />}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={languages}
                    sx={{ width: 240 }}
                    renderInput={(params) => <TextField {...params} label="I want translation in" />}
                />
                <Button variant="contained" >Join room</Button>

            </div>
        </Container>
    )
}