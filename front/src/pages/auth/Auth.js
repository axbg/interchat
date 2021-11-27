import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, CardActions, Button, Container, Input, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import illustration from '../../assets/images/connect.svg';
import { CreateAccountDialog } from './CreateAccountDialog'
import axios from 'axios';
import './Auth.scss';

export const Auth = () => {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [secret, setSecret] = useState('');
    const [open, setOpen] = useState(false);

    const [isMember, setIsMember] = useState(true)
    const login = () => {
        axios.post('http://localhost:8080/api/user', {
            "tag": name,
            ...isMember && { "secret": secret },
        }).then(res => {
            localStorage.setItem('token', res?.data?.message?.token);
            localStorage.setItem('tag', name);
            setSecret(res?.data?.message?.secret)

            if (isMember) {
                navigate('/landing')
            } else {
                setOpen(true)
            }
        })
    }

    return (
        <Container style={{ paddingTop: '30px' }}>
            <h2>Nume/logo app</h2>
            <Grid container rowSpacing={4} spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }} style={{ paddingBottom: '30px' }}>
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
                            <FormControlLabel
                                value="top"
                                control={<Checkbox
                                    checked={isMember}
                                    onChange={() => setIsMember(prev => !prev)} />}
                                label="Already a member?"
                                labelPlacement="right"
                            />
                            {isMember &&
                                <FormControl variant="standard" sx={{ width: 300 }}>
                                    <InputLabel htmlFor="component-simple">Secret</InputLabel>
                                    <Input
                                        id="component-simple"
                                        onChange={(e) => setSecret(e.target.value)}
                                    />
                                </FormControl>
                            }
                            <div className="join-room margin-top-sm">
                                <Button variant="contained" onClick={login}>Let's go!</Button>
                            </div>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <img alt="illustration" src={illustration} height="300" style={{ paddingBottom: '30px' }} />
            <CreateAccountDialog open={open} onClose={() => setOpen(false)} secret={secret} onClick={() => navigate('/landing')} />
        </Container>
    )
}