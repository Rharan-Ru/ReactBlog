import React from 'react';
import GlobalStyle from './globalStyles';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';

import AdminPage from './Admin';
import AdminSingle from './components/adminPage/adminPost';
import AdminUpdatePost from './components/adminPage/adminUpdate';

import Header from './components/globals/Header';
import Footer from './components/globals/Footer';
import Register from './components/user/Register';
import Login from './components/user/Login';
import SignUp from './components/user/Logout';
import Single from './components/pages/detailsPage/Single';
import Search from './components/utils/Search';
import Create from './components/user/CreatePost';
import UserPerfil from './components/user/UserProfile/Profile';
import ListUsersProfiles from './components/user/UserProfile/ListProfiles';
import ListCategories from './components/pages/categoriesPage/ListCategories';
import PostUpdate from './components/user/PostUpdate';

import NotFound from './components/pages/notFound';

const Rotas = () => {
  const [admin, setAdmin] = React.useState(false);
  const local_access_token = localStorage.getItem('access_token')
  React.useEffect(() => {
    if (local_access_token) {
      const token = JSON.parse(atob(local_access_token.split('.')[1]));
      token.admin && setAdmin(true);
    }
    else {
      setAdmin(false);
    };
  }, [local_access_token]);

  return (
    <BrowserRouter >
      <GlobalStyle />
      <Header />
      <Routes>
        {
          admin &&
          <>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/:slug" element={<AdminSingle />} />
            <Route path="/admin/update/:slug" element={<AdminUpdatePost />} />
          </>
        }
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<SignUp />} />
        <Route path="/perfils" element={<ListUsersProfiles />} />
        <Route path="/perfils/:slug" element={<UserPerfil />} />
        <Route path="/create" element={<Create />} />
        <Route path="update/:slug" element={<PostUpdate />} />
        <Route path="/post/:slug" element={<Single />} />
        <Route path="/search" element={<Search />} />

        <Route path="/categoria/:categoria" element={<ListCategories />} />
        
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter >
  )
};

ReactDOM.render(<Rotas />, document.getElementById('root'));
