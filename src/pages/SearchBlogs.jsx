import React, { useEffect, useState } from 'react';
import { BlogCart, BlogCartSkeleton, Navbar } from '../components';
import blogService from '../services/blog.service';

const tags = [
	'mechlin learning',
	'web design',
	'financial',
	'health',

	'web development',
	'science',

	'career',
	'gaming',

	'politics',
	'environment',

	'psychology',
	'history',
];

function SearchBlogs() {
	const [search, setSearch] = React.useState('');
	const [selectedTag, setSelectedTag] = React.useState('mechlin learning');
	const [blogs, setBlogs] = useState({
		loading: false,
		data: null,
		error: null,
	});

	useEffect(() => {
		let timeoutId;
		clearTimeout(timeoutId);

		if (search.trim() !== '') {
			// Set loading state
			setBlogs({ loading: true, data: null, error: null });

			// Debounce the search function
			timeoutId = setTimeout(async () => {
				try {
					console.count('calling');

					const response = await blogService.getBlogBySearchTerm(
						search
					);
					setBlogs({
						loading: false,
						data: response,
						error: null,
					});
				} catch (error) {
					setBlogs({ loading: false, data: null, error });
				}
			}, 1000); // Debounce time: 1000ms
		} else {
			// Clear timeout if search term is empty
			clearTimeout(timeoutId);
		}

		// Cleanup function to clear timeout on component unmount or when search term changes
		return () => clearTimeout(timeoutId);
	}, [search]);

	const handelSelectTag = (tag) => {
		setSelectedTag(tag);
	};

	const handelSearch = async () => {};

	console.log(blogs?.data?.[0]);
	return (
		<div className='px-5 md:px-0'>
			<Navbar />
			<div className='relative w-full items-center justify-center flex'>
				<div className='w-full items-center justify-center flex  flex-col'>
					<div className='w-full md:w-[70%] relative items-center justify-center flex rounded-md overflow-hidden '>
						<input
							placeholder='Search...'
							onChange={(e) => setSearch(e.target.value)}
							value={search}
							type='text'
							name=''
							id=''
							className='w-full p-[10px] rounded-[8px] border border-[#7F56D9] outline-none'
						/>
						<button
							onClick={handelSearch}
							className='h-full px-5 text-xs md:text-base md:px-10 bg-[#7F56D9] text-white  absolute right-0'>
							Search
						</button>
					</div>

					{/* search by category's or tags */}
					<div className='w-full md:w-[70%] grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 text-xs mt-5 gap-2'>
						{tags.map((tag) => (
							<button
								onClick={() => handelSelectTag(tag)}
								type='button'
								key={tag}
								className={`px-5 border text-textPrimary py-2 col-auto rounded-sm shadow-sm uppercase border-blue-400  hover:bg-blue-400 hover:text-white duration-150 ${
									selectedTag === tag
										? 'bg-blue-400 text-white'
										: ''
								}`}>
								{tag}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* search results */}
			<section className=' px-5'>
				<p className='text-[24px]  leading-[32px] mt-10 mb-5  text-textPrimary h-[32px] text-center py-10 md:text-left '>
					Search blog posts
				</p>
				{blogs.error && (
					<h1 className='text-textPrimary text-2xl  text-center'>
						{blogs.error.message}
					</h1>
				)}
				{!blogs?.loading &&blogs?.data?.length === 0 && (
					<h1 className='text-center text-2xl text-textPrimary'>Blog Not Found </h1>
				)}

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 place-items-center lg:grid-cols-3 gap-[24px] md:gap-10'>
					{!blogs.error && blogs.loading ? (
						<>
							{Array(6)
								.fill(0)
								.map((item, index) => (
									<BlogCartSkeleton key={index} />
								))}
						</>
					) : (
						blogs.data?.map((item, index) => (
							<BlogCart key={index} item={item} />
						))
					)}
				</div>
			</section>
		</div>
	);
}

export default SearchBlogs;
