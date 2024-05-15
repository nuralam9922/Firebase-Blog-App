import React from 'react';
import {
	BlogCart,
	BlogCartSkeleton,
	Button,
	Navbar,
	ThemeIcon,
} from '../components';
import { useNavigate } from 'react-router';
import useValidateUserAccess from '../hooks/useValidateUserAccess';
import authService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { useEffect } from 'react';
import blogService from '../services/blog.service';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toggleTheme } from '../features/themeSlice';
import EditProfilePopup from '../components/EditProfilePopup';
import { fetchUserBlogs } from '../features/userBlogSlice';
import { useSelector } from 'react-redux';
function Profile() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userStatus, user } = useValidateUserAccess();

	if (userStatus === false) {
		navigate('/auth/login');
	}
	const { blogs, loading, error } = useSelector((state) => state.userBlogs);

	const [showPrivatePosts, setShowPrivatePosts] = useState(false);
	const [showPopup, setShowPopup] = useState(false);

	const handelLogout = () => {
		authService.signOut();
		dispatch(logout());
		navigate('/auth/login');
	};

	useEffect(() => {
		if (blogs.length == 0) {
			dispatch(fetchUserBlogs());
		}
	}, [blogs.length, dispatch]);

	const handelThemeChange = () => {
		dispatch(toggleTheme());
	};

	const allBlogPosts = blogs || [];
	const privatePosts = allBlogPosts.filter(
		(blog) => blog.isPublicPost === false
	);

	return (
		<>
			<Navbar />
			<div className='container mx-auto px-4 py-8 min-h-screen'>
				{/* user profile section */}
				<div className='w-full  py-10 flex items-center justify-center text-textPrimary gap-10 '>
					<div className=' max-w-3xl flex items-start gap-4 md:gap-20 justify-between '>
						<div className='size-14 md:size-20   flex-shrink-0'>
							<img
								src={
									user?.userPhoto ||
									`https://via.placeholder.com/200`
								}
								className='size-14 md:size-20 flex-shrink-0 bg-slate-300 rounded-full border-2 border-white object-cover'
								alt={user?.userName}
							/>
						</div>
						<div className='bio'>
							<h1 className='md:text-3xl font-bold'>
								{user?.userName}
							</h1>
							<p
								style={{
									wordBreak: 'break-all',
								}}
								className='text-xs md:text-sm mt-2 text-wrap hid'>
								{user?.bio?.slice(0, 150)}
							</p>
						</div>
						<div className='EditButton'>
							<button
								onClick={() => setShowPopup(true)}
								className='px-5 text-nowrap py-2 scale-75 md:scale-100 bg-blue-500 text-white rounded-md'>
								Edit Profile
							</button>
							<EditProfilePopup
								user={user}
								showPopup={showPopup}
								setShowPopup={setShowPopup}
							/>
						</div>
					</div>
				</div>
				

				{/* toggle theme and logout buttons */}
				<div className='flex items-center  justify-end mb-8 gap-5'>
					<div>
						<button
							onClick={handelThemeChange}
							className=' size-8 md:size-10 border text-textPrimary border-blue-500  gap-5   flex items-center justify-center  rounded-full '>
							<ThemeIcon />
						</button>
					</div>
					<button
						onClick={handelLogout}
						className=' text-xs px-2 md:px-4 py-2 md:py-2 bg-blue-500 text-white rounded-md float-end text-end'>
						Logout
					</button>
				</div>
				{/* user blogs section */}
				<div className='mb-8'>
					<div className='w-full items-center justify-center flex mt-20 duration-200'>
						<Button
							onClick={() => setShowPrivatePosts(false)}
							label='All Posts'
							className={`border-2 border-zinc-300 ${
								showPrivatePosts === false
									? 'bg-blue-400 text-white'
									: ''
							}`}
						/>
						<Button
							onClick={() => setShowPrivatePosts(true)}
							label='Private Posts'
							className={`border border-zinc-300  ${
								showPrivatePosts === true
									? 'bg-blue-400 text-white'
									: 'text-textPrimary'
							}`}
						/>
					</div>
					{error && <h1>{error.message}</h1>}
					{!showPrivatePosts && allBlogPosts.length === 0 && (
						<div className='w-full  mt-20'>
							<h1 className='text-textPrimary text-center'>
								No Posts Yet
							</h1>
						</div>
					)}
					{showPrivatePosts && privatePosts.length === 0 && (
						<div className='w-full  mt-20'>
							<h1 className='text-textPrimary text-center'>
								No Posts Yet
							</h1>
						</div>
					)}
					<div
						className={`grid grid-cols-1 sm:grid-cols-2
					 md:grid-cols-2 place-items-center lg:grid-cols-3 gap-[24px]
					  md:gap-10 mt-20 `}>
						{!error && loading ? (
							<>
								{Array(6)
									.fill(0)
									.map((item, index) => (
										<BlogCartSkeleton
											key={index}
										/>
									))}
							</>
						) : (
							<>
								{showPrivatePosts ? (
									<>
										{privatePosts.map((item) => {
											return (
												<BlogCart
													showDots={true}
													key={item.id}
													item={item}
												/>
											);
										})}
									</>
								) : (
									<>
										{allBlogPosts.map((item) => {
											return (
												<BlogCart
													showDots={true}
													key={item.id}
													item={item}
												/>
											);
										})}
									</>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
