import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import AdminPage from './Admin';

import Header from './components/pageParts/Header';
import Footer from './components/pageParts/Footer';
import Register from './components/user/Register';
import Login from './components/user/Login';
import SignUp from './components/user/Logout';
import Single from './components/pageParts/Single';
import Search from './components/utils/Search';
import Create from './components/user/CreatePost';

const local_access_token = localStorage.getItem('access_token')
const token = JSON.parse(atob(local_access_token.split('.')[1]));

const routing = (
  <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        {token.admin && <Route path="/admin" element={<AdminPage />} />}
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
