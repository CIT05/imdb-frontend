import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Title from './components/Title/Title';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>elem</div>} />
        <Route path='/login' element={<div>elem 1</div>} />
        <Route path='/register' element={<div>elem 2</div>} />
        <Route path='/title/:tconst' element={<Title />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
