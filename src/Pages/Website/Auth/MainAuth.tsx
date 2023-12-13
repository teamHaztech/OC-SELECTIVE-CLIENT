import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Dialog, Tab } from '@mui/material';
import Login from './Login';
import { UserContext } from '../../../Context/UserContext';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Register from './Register';

const MainAuth = () => {
    const { open, handleClose, values,dispatch} = UserContext();
 
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        dispatch({ type: 'SET_VALUES', payload:newValue })
    };

    return (
        <Dialog onClose={handleClose} open={open} >
            <Box sx={{maxWidth:"480px"}}>
            <TabContext value={values} >
                <Box sx={{mt:'10px',}} >
                    <TabList onChange={handleChange} 
                   sx={{ '& .MuiTab-root': {mx:{lg:'70px',xs:'12px',md:'80px',sm:'50px'} } }} centered>
                        <Tab label="Login" value="1" />
                        <Tab label="Register" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1"><Login /></TabPanel>
                <TabPanel value="2"> <Register /></TabPanel>
            </TabContext>
            </Box>
        </Dialog>
    )
}

export default MainAuth

