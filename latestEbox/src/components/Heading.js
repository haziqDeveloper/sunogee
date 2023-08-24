import React from 'react';

const Heading = (props) => {
  return (
    <>
      <p className='Heading-p'>{props.title}</p>
      {props.children}
    </>
  );
};

export default Heading;

