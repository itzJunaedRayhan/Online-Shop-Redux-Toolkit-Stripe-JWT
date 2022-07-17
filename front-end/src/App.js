import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Cart from './Components/Cart/Cart';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="/not-found" element={<NotFound/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
