import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { CustomCard } from '../../components/common/CustomCard';
import './ExploreRooms.scss';

export const ExploreRooms = () => {
    // const [rooms, setRooms] = useState([]);
    // useEffect(() => {
    //     //
    //     setRooms([])
    // }, []);

    return (
        <Container className='explore-rooms'>
            <Grid container rowSpacing={4} spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={1} sm={4} md={4} key={index}>
                        <CustomCard />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}