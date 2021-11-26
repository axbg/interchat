import React from 'react';
import {Card, CardContent, Typography, Grid, CardActions, Button, Container} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import illustration from '../../assets/images/community.svg';

export const LandingPage = () => {
    let navigate = useNavigate();
    return(
        <Container style={{paddingTop: '30px'}}>
            <img alt="illustration" src={illustration} height="300" style={{paddingBottom: '30px'}}/>
            <Grid container rowSpacing={4} spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                    <Grid item xs={1} sm={4} md={4}>
                        <Card >
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Create a room that you can share with your friends and start having fun.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <div className="join-room">
                                    <Button variant="contained" onClick={() => navigate("/create-room")}>Create room</Button>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={1} sm={4} md={4}>
                        <Card >
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Join a room that you can share with your friends and start having fun.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <div className="join-room">
                                    <Button variant="contained" onClick={() => navigate("/join-room")}>Join room</Button>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={1} sm={4} md={4}>
                        <Card >
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Join a random a room that you can share with your friends and start having fun.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <div className="join-room">
                                    <Button variant="contained" onClick={() => navigate("/explore-rooms")}>Explore</Button>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
            </Grid>
        </Container>
        )
}