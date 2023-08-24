import React from 'react';

const Progress = (props) => {
  return (
    <>
    <div className='ReportProgressMainDiv'>
      <div>
        <h2>{props.count}</h2>
        <p>{props.title}</p>
      </div>
    </div>
    </>
  );
};

export default Progress;

