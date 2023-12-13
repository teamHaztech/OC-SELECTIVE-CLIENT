import { Box, Card, CardContent, CardMedia } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import { ParaText2 } from '../../../../Components/Common/ParaText';
import img from "../../../../Assets/images/contact_us.jpg";

const ImageCard = () => {
  return (
    <Card sx={{ width: { lg: '595px', xs: '350px',md:'600px',sm:'600px' }, height: '373px', textAlign: 'center', my: { xs: '19px',lg:0 } }}>
      <CardContent sx={{
        position: 'absolute', zIndex: '2', display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: { lg: '595px', xs: '300px' }, height: '373px'
      }}>
        <Box sx={{ display: 'flex', p: '4px', }}>
          <PhoneIcon sx={{ color: '#FFFFFF', width: '30px', height: '30px', mx: '12px' }} />
          <ParaText2 text="+61 8888889993" />
        </Box>
        <Box sx={{ display: 'flex', p: '4px', }}>
          <EmailIcon sx={{ color: '#FFFFFF', width: '30px', height: '30px', mx: '12px' }} />
          <ParaText2 text="aiedtech@gmail.com" />
        </Box>
        <Box sx={{ display: 'flex', p: '4px', }}>
          <LanguageIcon sx={{ color: '#FFFFFF', width: '30px', height: '30px', mx: '12px' }} />
          <ParaText2 text="www.aiedtech.com" />
        </Box>
      </CardContent>
      <CardMedia component="img" alt="no" image={img}
        sx={{ position: 'relative', zIndex: '0', width: "100%", height: '373px', opacity: '1' }} />

    </Card>
  )
}

export default ImageCard;
