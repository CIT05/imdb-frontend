import { BrowserRouter, Route,  Routes } from 'react-router';
import './App.css';

function App() {
  return (
   <BrowserRouter>
   
   <Routes>
      <Route path="/" element={<div>elem</div>} />
      <Route path="/login" element={<div>elem 1</div>} />
      <Route path="/register" element={<div>elem 2</div>} />     
   </Routes>
  
  </BrowserRouter>
  );
}

export default App;
