import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { CustomCard } from '../../components/common/CustomCard';
import { useNavigate } from 'react-router';
import _ from 'lodash';
import './ExploreRooms.scss';

export const ExploreRooms = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/api/room', {
            headers: { "Authorization": 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVlN2FjMWE3LTk5MmMtNDJkZC1iMDIzLTc3NTBjMTE5MDhkMCIsImlzcyI6InNvbWVvbmUifQ.Nmk1sOYbtWioeNfKt05Zfx5nDrW3f8wtalOF-p7ky3w' }
        }).then(res => {

            console.log(res);
            const roomsFound = res.data.message.map(item => {
                return {
                    ...item,
                    tags: item.tags.split('#'),
                }
            })
            setRooms(roomsFound);
        })
    }, []);

    return (
        <Container className='explore-rooms'>
            <Grid container rowSpacing={4} spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                {rooms?.map((item, index) => (
                    <Grid item xs={1} sm={4} md={4} key={index}>
                        <CustomCard room={item} md={12} onItemClick={() => navigate('/join-room', { state: { room: item } })} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}