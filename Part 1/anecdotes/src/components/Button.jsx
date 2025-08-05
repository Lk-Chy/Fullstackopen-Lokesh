import React from 'react';

const Button = ({ func, label }) => {
  return (
    <>
      <button onClick={func}>{label}</button>
    </>
  );
};

export default Button;
