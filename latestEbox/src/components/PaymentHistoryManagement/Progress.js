import React from 'react';

const Progress = (props) => {
  return (
    <>
      <div className='ProgressMainDiv'>
        <img src={props.img} alt={props.alt} />
        <div>
          <h2>{props.count}</h2>
          <p>{props.title}</p>
        </div>
      </div>
    </>
  );
};

export default Progress;

