import React from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading__container">
     <Spinner className="spinner" animation="border" variant="info" />
    </div>
  );
};

export default Loading;