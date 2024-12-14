import React from 'react';
import './Loading.css';
import Spinner from 'react-bootstrap/esm/Spinner';

const Loading = () => {
  return (
    <div className="loading__container">
     <Spinner className="spinner" animation="border" variant="info" />
    </div>
  );
};

export default Loading;