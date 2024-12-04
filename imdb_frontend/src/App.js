import { BrowserRouter, Route, Routes } from 'react-router';
import Navigation from './components/navigation/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './components/footer/Footer';
import React from 'react';
import Title from './components/Title/Title';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <Navigation />
              <Footer />
            </div>
          }
        />
        <Route path='/login' element={<div>elem 1</div>} />
        <Route path='/register' element={<div>elem 2</div>} />
        <Route path='/title/:tconst' element={<Title />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
