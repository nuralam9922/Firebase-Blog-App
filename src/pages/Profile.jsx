import React from 'react';
import { Button, Navbar } from '../components';
import { useNavigate } from 'react-router';
import useValidateUserAccess from '../hooks/useValidateUserAccess';
import authService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { useEffect } from 'react';
function Profile() {
	const navigate = useNavigate();
	const { userStatus, user } = useValidateUserAccess();
	const dispatch = useDispatch();
	useEffect(() => {
		if (userStatus === false) {
			console.log('userStatus', user);
			navigate('/auth/login');
		}
	}, [userStatus]);

	const handelLogout = () => {
		authService.signOut();
		dispatch(logout());
		navigate('/auth/login');
	};

	return (
		<>
			<Navbar />
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-end mb-8">
					<button onClick={handelLogout} className="px-4 py-2 bg-blue-500 text-white rounded-md float-end text-end">
						Login
					</button>
				</div>
				<div className="w-full border-b py-10 flex items-center justify-center">
					<div className="w-3/4 max-w-xl flex items-center gap-8  justify-center">
						<img
							src={user.userPhoto || `https://via.placeholder.com/200`}
							className="w-24 h-24 rounded-full border-4 border-white"
							alt={user.userName}
						/>
						<div>
							<h1 className="text-3xl font-bold">{user.userName}</h1>
							<p className="text-gray-500">Software Engineer</p>
							<div className="flex items-center gap-4 mt-2">
								<span className="text-gray-500">100 posts</span>
								<span className="text-gray-500">10k followers</span>
								<span className="text-gray-500">1k following</span>
							</div>
						</div>
					</div>
				</div>

				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-4 py-10">All Posts</h2>
					<div className="w-full items-center justify-center flex">
						<Button label="Public Posts" className={`border-2 border-zinc-300`} />
						<Button label="Private Posts" className={`border-2 border-zinc-300`} />
					</div>
					<div className="grid grid-cols-3 gap-4 mt-4">
						<div className="bg-gray-100 p-4 rounded-md">
							<img src="https://via.placeholder.com/200" alt="Post Image" className="w-full h-auto rounded-md" />
						</div>
						<div className="bg-gray-100 p-4 rounded-md">
							<img src="https://via.placeholder.com/200" alt="Post Image" className="w-full h-auto rounded-md" />
						</div>
						<div className="bg-gray-100 p-4 rounded-md">
							<img src="https://via.placeholder.com/200" alt="Post Image" className="w-full h-auto rounded-md" />
						</div>
					</div>
				</div>
				<div>
					<button className="px-4 py-2 bg-gray-500 text-white rounded-md">Toggle Theme</button>
				</div>
			</div>
		</>
	);
}

export default Profile;
