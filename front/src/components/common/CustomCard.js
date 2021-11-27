import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

import "./CustomCard.scss";
export const CustomCard = ({ user = 'SDFBDSDS', ...props }) => {
    return (
        <Card >
            <CardContent>
                <Typography sx={{ fontSize: 18 }} align="center" gutterBottom>
                    {props?.room?.name}
                </Typography>
                {/* <Typography sx={{ fontSize: 14 }} align="center" gutterBottom>
                    {`Created by ${user}`}
                </Typography> */}
                <Typography sx={{ fontSize: 14 }} color="text.secondary" align="center" gutterBottom>
                    Topics discussed
                </Typography>

                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {props?.room?.tags.map((item, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Chip label={`#${item}`} variant="outlined" size="small" />
                        </Grid>
                    ))}
                </Grid>


            </CardContent>
            <CardActions>
                <div className="join-room">
                    <Button variant="contained" onClick={() => props.onItemClick()}>Join room</Button>
                </div>
            </CardActions>
        </Card>
    )
}