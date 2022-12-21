import React from 'react'

const Footer = () => {
  const style = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    // fontSize: '1.25rem',
  }

  return (
    <div className='footer' style={style}>
      <p>Created By: <br/>Giuseppe Fazzolari 2022</p>
    </div>
  )
};

export default Footer