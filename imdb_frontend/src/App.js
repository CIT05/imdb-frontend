import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import Navigation from './components/navigation/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './components/footer/Footer';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import Title from './components/Title/Title';
import React from 'react';
import Loading from './components/loading/Loading';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <Navigation />
              <Outlet />
              <Footer />
            </div>
          }
        >
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path='profile' element={<Profile />} />
          <Route path='/title/:tconst' element={<Title />} />
        </Route>
        <Route path='/register' element={<div>elem 2</div>} />
        <Route path='/loading' element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
