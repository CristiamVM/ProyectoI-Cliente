import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';


function App() {
  if (localStorage.getItem("session") === null) {
    return <Login />
  }

  return (
    <div className='wrapper'>
      <Router>
        <Routes>

          <Route path='/iniciarsesion' element={<Login />}></Route>

        </Routes>
      </Router>   
    </div> 
  );
}

export default App;
