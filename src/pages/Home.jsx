import React from 'react';
import { BlogCart, BlogCartSkeleton, HeroSection, Navbar, Pagination } from '../components';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import blogService from '../services/blog.service';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

function Home() {
	// const {user} = useSelector((state) => state.authReducer);
	const [blogs, setBlogs] = useState([]);
	const { isPending, error, data } = useQuery({
		queryKey: ['blogData'],
		queryFn: async () => {
			const response = await blogService.getBlogs();
			return response;
		},
	});


	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);


	const navigate = useNavigate()
	return (
		<div>
			<Navbar />
			<div className='poppins-regular p-[10px] md:p-[30px] lg:p-[40px]  bg-background'>
				{/* animation for heading */}

				<div className='relative w-full items-center justify-center flex'>
					<div
						onClick={() => navigate('/search')}
						className='w-full md:w-[60%] relative items-center justify-center flex rounded-md overflow-hidden'>
						<input
							type='text'
							name=''
							id=''
							className='w-full p-[10px] rounded-[8px] border border-[#7F56D9] outline-none'
						/>
						<button className='h-full px-5 text-xs md:text-base md:px-10 bg-[#7F56D9] text-white  absolute right-0'>
							Search
						</button>
					</div>
				</div>

				{/* resent blog post section */}

				<section className=' '>
					<p className='text-[24px]  leading-[32px] mt-10 mb-5  text-textPrimary h-[32px] text-center py-10 md:text-left '>
						Recent blog posts
					</p>
					{error && (
						<h1 className='text-textPrimary text-3xl text-center'>
							{error.message}
						</h1>
					)}
					{data?.length === 0 && (
						<div className='text-2xl text-center text-textPrimary w-full'>
							No Blogs Available!!
						</div>
					)}
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 place-items-center lg:grid-cols-3 gap-[24px] md:gap-10 min-h-[20rem]'>
						{!error && isPending ? (
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
							data?.map((item, index) => (
								<BlogCart key={index} item={item} />
							))
						)}
					</div>
				</section>

				<footer className='w-full mt-20'>
					<div className='w-full h-[40px] flex items-center justify-center gap-[14px] text-textPrimary text-[18px]'>
						<p>© 2023</p> <p>Twitter</p> <p>LinkedIn</p>{' '}
						<p>Email</p>
						<p> feed Add to Feedly</p>
						<p>Privacy Policy</p>
					</div>
				</footer>
			</div>
		</div>
	);
}

export default Home;
