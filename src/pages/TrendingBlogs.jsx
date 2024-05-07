import React from 'react';
import { Navbar } from '../components';
import useValidateUserAccess from '../hooks/useValidateUserAccess';
import { useNavigate } from 'react-router';


function TrendingBlogs() {
	const navigate = useNavigate();
	const { userStatus } = useValidateUserAccess();
	if (!userStatus) {
		navigate('/auth/login');
	}

	return (
		<>
			<Navbar />

			<div className="w-full min-h-screen">
				<h1 className="text-3xl">Trending Blogs</h1>
			</div>
		</>
	);
}

export default TrendingBlogs;
