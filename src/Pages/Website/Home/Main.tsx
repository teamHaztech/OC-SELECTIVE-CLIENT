import { Container } from '@mui/material'
import React from 'react'
import LoadingBar from '../../../Components/Headers/LoadingBar'

import FirstSection from './FirstSection'
import FourthSection from './FourthSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'

interface props {
  user?:boolean;
}

const Main = (props:props) => {
 
  return (
    <>
      {/* {isLoading==true ? (
      ) : ( */}
     
        <>
          <FirstSection />
          <SecondSection />
          <ThirdSection />
          <FourthSection />
        </>
      {/* )} */}
    </>
  );
};

export default Main;
