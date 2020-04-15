import React from 'react';
import { useLocation } from 'react-router-dom';


function SharePoll(props) {
  let location = useLocation();

  return (
    <>
      <div>Share Poll Modal</div>
      <p>{location.pathname}</p>
    </>
  );
}

export default SharePoll;
