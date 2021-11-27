import React, { useState } from 'react';
import {Card, CardContent, Typography, Grid, CardActions, Button, Container, Input, FormControl, InputLabel} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import illustration from '../../assets/images/connect.svg';
import axios from 'axios';
import './Auth.scss';

export const Auth = () => {
    let navigate = useNavigate();
    const [name, setName] = useState('');

    const login = () => {
        axios.post('http://localhost:8080/api/login', {
            "tag": name,
            "input_lang": "en-US",
            "output_lang": "en-us",
            "id": "8c4b162b-1404-4577-84a8-6b1ea13660c8"
        }).then(res => {
            localStorage.setItem('token', res.data.message);
            navigate('/landing');
        }) 
    }

    return(
        <Container style={{paddingTop: '30px'}}>
            <h2>Nume/logo app</h2>
            <Grid container rowSpacing={4} spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}  style={{paddingBottom: '30px'}}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Card >
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Enter a name and get ready for new, exciting cultural experiences!
                                </Typography>
                            </CardContent>
                            <CardActions className="form-section-login">
                                    <FormControl variant="standard" sx={{ width: 300 }}>
                                        <InputLabel htmlFor="component-simple">Name</InputLabel>
                                        <Input
                                            id="component-simple"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </FormControl>
                                    <div className="join-room margin-top-sm">
                                    <Button variant="contained" onClick={login}>Let's go!</Button>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
            </Grid>
            <img alt="illustration" src={illustration} height="300" style={{paddingBottom: '30px'}}/>
        </Container>
        )
}