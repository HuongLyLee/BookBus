import React from 'react';

const Heading = ({ title, subtitle }) => {
  return (
    <>
        <div className='' >
            <h1 className='font-bold pt-4'> {title} </h1>
            <p className='text-sm'> {subtitle} </p>
        </div>
    </>
  )
}

export default Heading