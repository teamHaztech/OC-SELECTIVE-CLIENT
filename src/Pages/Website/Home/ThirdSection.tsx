import { Box, Collapse, Container, Paper, Theme } from '@mui/material'
import CardData from '../../../Assets/Data/CardData';
import { useRef, useState } from 'react';
import { Header1 } from '../../../Components/Common/HeaderText';
import FeatureCard from './components/FeatureCard';
// import { HashLink } from "react-router-hash-scroll";

interface mapData {
    title: string;
    description: string;
    image: string
}

const ThirdSection = () => {
  
    return (
        <Container maxWidth={false} sx={{ width: '98%', py: '15px', }} id="third">
            <Box sx={{ display: 'flex', alignItems: 'left', width: '100%', }}>
                <Header1 header='Features' />
            </Box>
            <Box 
            sx={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', 
            alignItems: 'left', 
            width: '100%', my:'40px' }}>
                {
                    CardData.map((item: mapData,key) => {
                        return <FeatureCard data={item} key={key} />;
                    })
                }
            </Box>
        </Container>
    )
}

export default ThirdSection
