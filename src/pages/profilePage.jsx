import React from 'react';
import { Navbar, BlogCart, BlogCartSkeleton } from '../components';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blog.service';
import authService from '../services/auth.service';

function ProfilePage() {
	const { userId } = useParams();

	const {
		data: userDetails,
		isError: userDetailsError,
		isLoading: userDetailsLoading,
	} = useQuery({
		queryKey: ['userDetails', userId],
		queryFn: async () => {
			const response = await authService.getUserDetails(userId);
			return response;
		},
	});

	const {
		data: blogData,
		isError: blogError,
		isLoading: userBlogLoading,
	} = useQuery({
		queryKey: ['userBlogs', userId],
		queryFn: async () => {
			const response = await blogService.getUserAllBlogs(userId);
			return response;
		},
		enabled: !!userDetails, // Fetch blogs only if userDetails are available
	});

	return (
		<>
			<Navbar />
			<div className='container mx-auto px-4 py-8 min-h-screen'>
				{/* User Profile Section */}
				<div className='w-full py-10 flex flex-col items-center justify-center text-textPrimary gap-6'>
					{userDetailsLoading ? (
						<div className='max-w-3xl flex flex-col md:flex-row items-center gap-6'>
							<div className='w-32 h-32 md:w-48 md:h-48 bg-slate-300 rounded-full animate-pulse'></div>
							<div className='flex flex-col gap-2'>
								<div className='h-8 bg-slate-300 rounded-md animate-pulse w-48'></div>
								<div className='h-4 bg-slate-300 rounded-md animate-pulse w-72'></div>
							</div>
						</div>
					) : userDetailsError ? (
						<div className='text-center text-red-500'>
							Failed to load user details.
						</div>
					) : (
						<div className='max-w-3xl flex flex-col md:flex-row items-center gap-6'>
							<div className='size-20 md:size-32  flex-shrink-0'>
								<img
									src={userDetails?.userPhoto}
									className='w-full h-full bg-slate-300 rounded-full border-2 border-white object-cover'
									alt={userDetails?.userName}
								/>
							</div>
							<div className='text-center md:text-left'>
								<h1 className='text-2xl md:text-3xl font-bold'>
									{userDetails?.userName}
								</h1>
								<p className='text-sm md:text-base mt-2'>
									{userDetails?.bio}
								</p>
							</div>
						</div>
					)}
				</div>

				{/* User Blogs Section */}
				<div className='mb-8'>
					<h2 className='text-xl md:text-2xl font-bold text-center mb-6 text-textPrimary'>
						User Blogs
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{userBlogLoading ? (
							Array(6)
								.fill(0)
								.map((_, index) => (
									<BlogCartSkeleton key={index} />
								))
						) : blogError ? (
							<div className='text-center text-red-500'>
								Failed to load blogs.
							</div>
						) : blogData?.length === 0 ? (
							<div className='w-full mt-20'>
								<h1 className='text-textPrimary text-center'>
									No Posts Yet
								</h1>
							</div>
						) : (
							blogData?.map((item) => (
								<BlogCart
									key={item.id}
									item={item}
									showDots={false} // Assuming no edit/delete dots needed for this static showcase
								/>
							))
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default ProfilePage;
