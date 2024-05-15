import date from 'date-and-time';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import { removeContent } from '../../features/blogContentSlice';
import useUploadImage from '../../hooks/useUploadImage';
import blogService from '../../services/blog.service';
import Button from '../buttons/Button';
import LoadingButton from '../LoadingButton';
import { CgClose } from 'react-icons/cg';
import { useEffect } from 'react';
import { fetchUserBlogs } from '../../features/userBlogSlice';
const cookies = new Cookies();

const tags = [
	'react',
	'javascript',
	'css',
	'html',
	'web development',
	'web design',

	'nodejs',
	'express',
	'nextjs',
	'php',
	'laravel',
	'python',
	'ux',
	'ui',
	'mechlin learning',

	'app development',
	'java',
	'c++',
	'c#',
	'kotlin',
	'go',
	'rust',
	'c',
	'perl',
	'ruby',
	'financial',
	'health',
	'technology',
	'science',
	'lifestyle',
	'travel',
	'food',
	'fitness',
	'education',
	'fashion',
	'business',
	'marketing',
	'parenting',
	'entertainment',
	'career',
	'gaming',
	'art',
	'music',
	'politics',
	'environment',
	'self-improvement',
	'psychology',
	'history',
	'philosophy',
	'religion',
	'literature',
	'angular',
	'vuejs',
	'flutter',
];

function BlogPost({ previewData }) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [thumbnail, setThumbnail] = useState(null);
	const [downloadedThumbnailUrl, setDownloadedThumbnailUrl] = useState(null);

	const [title, setTitle] = useState('');
	const [isPublicPost, setIsPublicPost] = useState(true);
	const [selectedTags, setSelectedTags] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const { user } = useSelector((state) => state.authReducer);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { theme } = useSelector((state) => state.theme);

	const { uploadImage, uploadLoading } = useUploadImage();

	const handleThumbnailChange = async (e) => {
		// const toastId = toast.loading('Loading...');
		const file = e.target.files[0]; // Get the first file from the selected files

		if (file) {
			setThumbnail(file);
		} else {
			setDownloadedThumbnailUrl(null);
		}
	};

	const createPost = async () => {
		console.log(user);
		if (!user || !user.userId || !user.userName) {
			toast.error('Please login to create a post.');
			console.error('User data is incomplete.');
			return;
		}

		if (
			!title ||
			!previewData ||
			!selectedTags ||
			selectedTags.length === 0
		) {
			toast.error('Post data is incomplete.');

			console.error('Post data is incomplete.');
			return;
		}
		if (!thumbnail) {
			console.log(thumbnail);
			toast.error('Please upload thumbnail.');
			return;
		}
		const imageUrl = await uploadImage(thumbnail);

		if (imageUrl && !uploadLoading) {
			const now = new Date();
			const post = {
				user: {
					userId: user.userId,
					// userAbater: user.userPhoto,
					// userName: user.userName,
				},
				likes: [],
				comments: [],
				title,
				isPublicPost: isPublicPost,
				htmlContent: previewData.data,
				tags: selectedTags,
				postDate: date.format(now, 'ddd, MMM DD YYYY'),
				postTime: date.format(now, 'hh:mm A'),
				thumbnail: imageUrl,
			};
			setLoading(true);
			try {
				await blogService.createPost(post);
				toast.success('blog created successfully!');
				navigate('/');
				setTimeout(() => {
					setLoading(false);
					dispatch(removeContent());
					dispatch(fetchUserBlogs());
				}, 400);
			} catch (error) {
				setLoading(false);
				toast.error(error.message);
			}
		}
	};

	const THUMBNAIL = thumbnail
		? URL.createObjectURL(thumbnail)
		: 'https://via.placeholder.com/300x200.png?text=Thumbnail';
	return (
		<div
			className={`w-[100%] bg-background text-textPrimary  flex flex-col gap-6  relative px-10 container mx-auto py-20`}>
			<div className='w-full'>
				<h1 className='text-2xl font-poppins ins'>Thumbnail</h1>
				<div className='w-full flex items-center flex-col justify-center mt-3 px-14'>
					<div className=' bg-slate-400 size-80 overflow-hidden rounded-md '>
						<img
							className=' bg-gray-600  h-full w-full rounded-lg object-cover object-top'
							src={THUMBNAIL}
						/>
					</div>
					<label
						htmlFor='thumbnailInput'
						className='relative cursor-pointer mt-3'>
						<input
							id='thumbnailInput'
							type='file'
							accept='image/*'
							className='sr-only'
							onChange={handleThumbnailChange}
						/>
						<div className='w-full h-auto max-h-60 px-10 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer'>
							<span className='text-gray-400 text-base md:text-lg text-nowrap'>
								Click to upload thumbnail
							</span>
						</div>
					</label>
				</div>
			</div>
			<div className='w-full'>
				<h1 className='text-2xl font-poppins  mb-2'>Title</h1>
				<input
					type='text'
					className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 outline-none'
					placeholder='Enter title...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>

			<div className='w-full flex items-center'>
				<input
					checked={isPublicPost}
					onChange={(e) => setIsPublicPost(e.target.checked)}
					type='checkbox'
					id='publishCheck'
					className='mr-2 cursor-pointer'
				/>
				<label
					htmlFor='publishCheck'
					className='text-lg  cursor-pointer'>
					Publish Post
				</label>
			</div>

			<section>
				<h1 className='text-2xl font-poppins  py-5'>Tags</h1>
				{/* selected tags */}

				<div className='w-full grid grid-cols-1 text-xs sm:text-sm sm:grid-cols-3 md:text-base md:grid-cols-4 lg:grid-cols-6 gap-2 '>
					{selectedTags.map((tag) => (
						<Button
							key={tag}
							label={tag}
							className={`${
								selectedTags.includes(tag)
									? 'bg-blue-500 text-white'
									: ''
							}  w-full text-textPrimary`}
						/>
					))}
				</div>

				<div className='relative w-full my-10'>
					{/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div> */}
					<input
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						type='search'
						className='bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 text-black outline-none'
						placeholder='Search Tags...'
						required
					/>
					<button
						onClick={() => setSearchValue('')}
						type='button'
						className='absolute top-3 right-2 border'>
						<CgClose />
					</button>
				</div>

				<div className='w-full grid grid-cols-1 text-xs sm:text-sm sm:grid-cols-3 md:text-base md:grid-cols-4 lg:grid-cols-6 gap-2  min-h-screen'>
					{tags
						.filter((tag) =>
							searchValue === ''
								? true
								: tag
										.toLowerCase()
										.includes(
											searchValue.toLowerCase()
										)
						)
						.map((tag) => (
							<Button
								key={tag}
								label={tag}
								onClick={() => {
									setSelectedTags((prevTags) => {
										if (prevTags.includes(tag)) {
											return prevTags.filter(
												(prevTag) =>
													prevTag !== tag
											);
										}
										return [...prevTags, tag];
									});
								}}
								className={`${
									selectedTags.includes(tag)
										? 'bg-blue-500 text-white'
										: ''
								}  w-full text-textPrimary h-20`}
							/>
						))}
				</div>
			</section>

			<div className='w-full flex justify-end'>
				{loading ? (
					<div>
						<LoadingButton
							label={'processing...'}
							disabled={loading}
						/>
					</div>
				) : (
					<>
						<button
							onClick={createPost}
							className='bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
							Create Post
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default BlogPost;
