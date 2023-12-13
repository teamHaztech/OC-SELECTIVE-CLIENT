import axios from 'axios';
import React from 'react'
import BaseUrl from './BaseUrl';

const UseGet = (url: string) => {
  return (
    async () => {
      try {
        const response = await axios.get(url, {
          headers: { Accept: 'application/json' },
        });
        return response.data;
      } catch (err) {
        console.log(err);
      }
    }
  );
};

export default UseGet;

