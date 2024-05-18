import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Loading, Navbar, ProgressBar } from '../components';
import authService from '../services/auth.service';
import blogService from '../services/blog.service';


function BlogDetails() {
	const { id } = useParams();

	const blogContainerRef = React.useRef(null);

	useEffect(() => {
		if (blogContainerRef.current) {
			blogContainerRef.current.scrollTop = '50%';
		}
	}, []);

	const { isPending, error, data } = useQuery({
		queryKey: [id],
		queryFn: async () => {
			const response = await blogService.getSinglePost(id);
			return response
		},
	});

	const {
		isPending: isUserDetailsPending,
		error: userDetailsError,
		data: userDetails,
	} = useQuery({
		queryKey: [data?.user],
		queryFn: async () => {
			const response = await authService.getUserDetails(data.user.userId);
			return response;
		},
	});




	// if(error) {
	// 	return <div className='text-center'>{error.message}</div>
	// }

	return (
		<div>
			<Navbar />

			{/* progress bar */}
			<ProgressBar />
			<div
				ref={blogContainerRef}
				className='w-full flex items-center justify-center '>
				<div
					style={{}}
					className='border w-[100%] lg:w-[50%] min-h-screen  p-5 lg:px-10 text-justify shadow-md text-textPrimary flex-wrap text-wrap overflow-hidden'>
					{/* {parse(blog?.htmlContent)} */}
					{error ? (
						<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
							{error.message}
						</div>
					) : (
						<>
							{!error && isPending ? (
								<div>
									<Loading />
								</div>
							) : (
								<>
									<div
										style={{
											wordBreak: 'break-all',
										}}
										className='w-full'>
										<h1
											style={{
												wordBreak:
													'break-all',
											}}
											className='text-3xl font-bold '>
											{data?.title}
										</h1>
										<div className='flex items-center py-10'>
											{userDetails ? (
												<>
													<Link
														to={`/profile/${data.user.userId}`}>
														<div className='flex items-center  '>
															<img
																className='w-10 h-10 rounded-full mr-2 bg-slate-400'
																src={
																	userDetails?.userPhoto
																}
																alt='User Avatar'
															/>
															<div className='flex flex-col'>
																<h3 className=' text-xs md:text-lg font-bold'>
																	{
																		userDetails?.userName
																	}
																</h3>
																<p className='text-sm text-gray-500'>
																	Follow
																</p>
															</div>
														</div>
													</Link>
												</>
											) : (
												<div className='flex items-center py-10'>
													{/* Skeleton UI for user details */}
													<div className='w-10 h-10 rounded-full mr-2 bg-gray-300'></div>
													<div>
														<div className='h-4 w-24 bg-gray-300 mb-1'></div>
														<div className='h-2 w-20 bg-gray-300'></div>
													</div>
												</div>
											)}
											<div className='ml-auto text-right'>
												<p className='text-sm text-gray-500'>
													{data.postDate
														.split(
															'/'
														)
														.join(
															' / '
														)}
												</p>
												<p className='text-sm text-gray-500'>
													{
														data?.postTime
													}
												</p>
											</div>
										</div>
									</div>
									<div
										style={{
											wordBreak: 'break-all',
										}}
										className='text-left'
										dangerouslySetInnerHTML={{
											__html: data?.htmlContent,
										}}></div>
								</>
							)}
						</>
					)}
				</div>
			</div>
			<div className='w-full py-20 items-center justify-center flex'>
				<Link to={'/'}>
					<Button label='go to home' />
				</Link>
			</div>
		</div>
	);
}

export default BlogDetails;
