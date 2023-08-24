import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  // const token = Cookies.get('token');
  // useEffect(() => {
  //   console.log('checking route' , window.location.href.indexOf("login"));
  //   if (window.location.href.indexOf("login") > -1) {
  //     console.log('login');
  //     if (token) {   
  //       // console.log('window',window.history.state);
  //       // if (window.history.state && window.history.state.idx > 0) {
  //         navigate(-1);
  //       // }
  //     }
  //   }else{
  //     if (!token) {      
  //       navigate('/');
  //     }
  //   }
  //   // else{
  //     //  if (window.history.state && window.history.state.idx > 0) {
  //       // navigate(-1);
  //     // } else {
  //       // navigate('/', { replace: true });
  //     // }
  //   // }
   
  // },[token]);
  return (
    <>
      <Component />
    </>
  );
}
export default Protected;
