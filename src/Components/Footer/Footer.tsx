import { Box, Container, Typography } from '@mui/material'
import { Header2 } from '../Common/HeaderText';
import { ParaText1 } from '../Common/ParaText';
import { Link } from 'react-router-dom';

const pages = ['ABOUT US', 'FEATURES', 'TESTS SERIES' ];
const purl = ['/', '', '', '/product'];
const pages2 = ['TERMS AND CONDITIONS ', 'PRIVACY', 'Contact us'];
const surl = ['/', '', '', '/product'];

const Footer = () => {
    return (
        <Container  maxWidth={false} sx={{width:'100%', display:'flex',justifyContent:{lg:'space-evenly',md:'space-evenly',sm:'space-evenly', xs:'space-between'} ,mt:'auto', backgroundColor:'#FFFFFF' }}>
            <Box sx={{my:'auto'}}>
                {pages.map((item,key) => {
                    return <Link to={surl[key]} key={key}> <Header2 header={item} css={{py:'10px'}} /></Link>   
                })}
            </Box>
            <Box sx={{my:'auto'}}>
                {pages2.map((item,key) => {
                    return <Link to={surl[key]} key={key}> <Header2 header={item} css={{py:'10px'}}/></Link>
                    
                })}
            </Box>
            <Box sx={{my:'auto',}}>
                <Typography noWrap align='center' component="a"
                    sx={{
                        fontSize: '48px', display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }, 
                        fontWeight: 600,
                        color: '#3A9BDC',
                        textDecoration: 'none',
                    }}> AI Tech ED </Typography>
            </Box>
        </Container>
    )
}

export default Footer
