import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import blogService from '../../services/blog.service';
import Button from '../buttons/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import LoadingButton from '../LoadingButton';
const cookies = new Cookies();
import date from 'date-and-time';
import { useDispatch } from 'react-redux';
import { removeContent } from '../../features/blogContentSlice';
import uploadService from '../../services/upload.service';
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

	'angular',
	'vuejs',
	'flutter',
];

function BlogPost({ previewData }) {
	const [thumbnail, setThumbnail] = useState(null);
	const [downloadedThumbnailUrl, setDownloadedThumbnailUrl] = useState(null);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [isPostPrivate, setIsPostPrivate] = useState(false);
	const [selectedTags, setSelectedTags] = useState([]);
	const { user } = useSelector((state) => state.authReducer);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleThumbnailChange = async (e) => {
		const toastId = toast.loading('Loading...');
		const file = e.target.files[0]; // Get the first file from the selected files

		if (file) {
			try {
				await uploadService.uploadFile(file, (url) => setDownloadedThumbnailUrl(url));
				// toast.remove();
				setTimeout(() => {
					toast.dismiss(toastId);
				}, 500);
			} catch (error) {
				console.error('Thumbnail upload failed:', error);
				toast.error('Thumbnail upload failed. Please try again.');
				toast.remove(); // Ensure to remove the loading toast even in case of error
			}
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

		if (!title || !description || !previewData || !selectedTags || selectedTags.length === 0) {
			toast.error('Post data is incomplete.');

			console.error('Post data is incomplete.');
			return;
		}


		if (!downloadedThumbnailUrl) {
			toast.error('Please upload thumbnail.');
			return;
		}
		const now = new Date();
		const post = {
			user: {
				userId: user.userId,
				userAbater: user.userPhoto || 'https://via.placeholder.com/300x200.png?text=Thumbnail',
				userName: user.userName,
			},
			likes: [],
			comments: [],
			title,
			description,
			isPostPrivate,
			htmlContent: previewData.data,
			tags: selectedTags,
			postDate: date.format(now, 'ddd, MMM DD YYYY'),
			postTime: date.format(now, 'hh:mm A'),
			thumbnail: downloadedThumbnailUrl,
		};

		setLoading(true);
		try {
			await blogService.createPost(post);
			toast.success('blog created successfully!');
			setLoading(false);
			dispatch(removeContent());
			setTimeout(() => {
				navigate('/');
			}, 500);
		} catch (error) {
			setLoading(false);
			toast.error(error.message);
		}
	};

	// const THUMBNAIL = thumbnail ? URL.createObjectURL(thumbnail) : 'https://via.placeholder.com/300x200.png?text=Thumbnail';
	return (
		<div className={`w-[100%]  p-3 flex flex-col gap-6 container mx-auto relative py-20 px-10`}>
			<div className="w-full">
				<h1 className="text-2xl font-poppins ins">Thumbnail</h1>
				<div className="w-full flex items-center flex-col justify-center mt-3 px-14">
					<div className=" bg-slate-400 size-80 overflow-hidden rounded-md">
						<img className=" bg-gray-600  h-72 rounded-lg object-cover object-top" src={downloadedThumbnailUrl} />
					</div>
					<label htmlFor="thumbnailInput" className="relative cursor-pointer mt-3">
						<input id="thumbnailInput" type="file" accept="image/*" className="sr-only" onChange={handleThumbnailChange} />
						<div className="w-full h-auto max-h-60 px-10 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer">
							<span className="text-gray-400 text-base md:text-lg text-nowrap">Click to upload thumbnail</span>
						</div>
					</label>
				</div>
			</div>
			<div className="w-full">
				<h1 className="text-2xl font-poppins  mb-2">Title</h1>
				<input
					type="text"
					className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 outline-none"
					placeholder="Enter title..."
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="w-full">
				<h1 className="text-2xl font-poppins  mb-2">Description</h1>
				<textarea
					className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 outline-none resize-none"
					rows="4"
					placeholder="Enter description..."
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
			</div>
			<div className="w-full flex items-center">
				<input
					checked={isPostPrivate}
					onChange={(e) => setIsPostPrivate(e.target.checked)}
					type="checkbox"
					id="publishCheck"
					className="mr-2 cursor-pointer"
				/>
				<label htmlFor="publishCheck" className="text-lg  cursor-pointer">
					Publish Post
				</label>
			</div>

			{/* selected tags */}
			<div className="w-full flex items-center justify-start flex-wrap gap-2">
				{tags.map((tag) => (
					<Button
						onClick={(e) => {
							setSelectedTags((prevTags) => {
								if (prevTags.includes(tag)) {
									return prevTags.filter((prevTag) => prevTag !== tag);
								}
								return [...prevTags, tag];
							});
						}}
						className={`${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : ''}`}
						key={tag}
						label={tag}
					/>
				))}
			</div>

			<div className="w-full flex justify-end">
				{loading ? (
					<div>
						<LoadingButton label={'processing...'} disabled={loading} />
					</div>
				) : (
					<>
						<button
							onClick={createPost}
							className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Create Post
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default BlogPost;
