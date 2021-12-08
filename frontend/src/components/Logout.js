import React, { useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
	const history = useNavigate();

	useEffect(() => {
		axiosInstance.post('users/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		history('/login');
	});
	return <div>Logout</div>;
}