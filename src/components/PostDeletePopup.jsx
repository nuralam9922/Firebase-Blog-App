import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserBlog } from '../features/userBlogSlice';
import blogService from '../services/blog.service';
import toast from 'react-hot-toast';

function PostDeletePopup({ showDeletePopup, setShowDeletePopup, blogDetails }) {
	const dispatch = useDispatch();
	const handelDeletePost = async () => {
		await blogService.deleteUserBlog(blogDetails.id);
		dispatch(deleteUserBlog(blogDetails));
		toast.success('Post deleted successfully');
		setShowDeletePopup(false);
	};

	return (
		<div
			className={`fixed top-1/2 left-1/2 transform z-[999] -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg ${
				showDeletePopup ? 'block' : 'hidden'
			}`}>
			<div className='text-center text-gray-800'>
				Are you sure you want to delete this post?
			</div>
			<div
				onClick={handelDeletePost}
				className='flex justify-center mt-4'>
				<button className='mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none'>
					Yes
				</button>
				<button
					onClick={() => setShowDeletePopup(false)}
					className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none'>
					No
				</button>
			</div>
		</div>
	);
}

export default PostDeletePopup;
