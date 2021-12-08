import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import SignUp from './components/Logout';
import Single from './components/Single';
import Search from './components/Search';
import Create from './components/CreatePost';


const routing = (
  <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
        <Route path="/post/:slug" element={<Single />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));
