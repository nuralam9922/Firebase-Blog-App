import React, { useState } from 'react';
import blogService from '../services/blog.service';
import { useDispatch } from 'react-redux';
import { changeBlogStatus, fetchUserBlogs } from '../features/userBlogSlice';
import LoadingButton from './LoadingButton';
import toast from 'react-hot-toast';

function ChangeBlogStatusPopup({
	showChangeBlogStatusPopup,
	setShowChangeBlogStatusPopup,
	blogDetails,
}) {
	const [isPublic, setIsPublic] = useState(
		blogDetails?.isPublicPost || false
	); // State to track whether the blog is public or private
	const [loading, isLoading] = useState(false);
	const dispatch = useDispatch();

	const handleCheckboxChange = () => {
		setIsPublic(!isPublic);
	};

	const handleSave = async () => {
		const updatedData = { ...blogDetails, isPublicPost: isPublic };
		
		if (isPublic !== blogDetails.isPublicPost) {
			try {
				isLoading(true);
				const res = await blogService.updateBlogStatus(
					blogDetails.id,
					updatedData
				);
				if (res === true) {
					dispatch(changeBlogStatus(blogDetails));
					setShowChangeBlogStatusPopup(false);
					toast.success('Blog status updated successfully');
					isLoading(false);
				} else {
					isLoading(false);
				}
			} catch (error) {
				console.log(error);
				isLoading(false);
			}
		} else {
			setShowChangeBlogStatusPopup(false);
		}
	};

	return (
		<div
			style={{
				display: showChangeBlogStatusPopup ? 'flex' : 'none',
			}}
			className='fixed w-full min-h-screen flex items-center justify-center z-[999] bg-black bg-opacity-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
			<div
				// style={{
				// 	display: showChangeBlogStatusPopup ? 'flex' : 'none',
				// }}
				className=' bg-white p-8 rounded-lg shadow-lg  flex flex-col justify-between gap-10 z-[999]'>
				<div className='text-center text-gray-800 text-2xl'>
					Change Blog Status
				</div>
				<div className='mt-4 flex justify-start items-start'>
					<label className='inline-flex items-center'>
						<span className='mr-2 text-gray-700 '>
							change blog status
						</span>
						<input
							type='checkbox'
							className='form-checkbox text-blue-500 h-5 w-5'
							checked={isPublic}
							onChange={handleCheckboxChange}
						/>
					</label>
				</div>
				<div className='flex justify-center mt-4'>
					{loading ? (
						<LoadingButton
							label={'Saving...'}
							className={
								'mr-4 px-4 py-2 bg-green-500 text-white rounded'
							}
						/>
					) : (
						<button
							onClick={handleSave}
							className={`mr-4 px-4 py-2  bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none`}>
							Save
						</button>
					)}

					<button
						disabled={loading}
						onClick={() =>
							setShowChangeBlogStatusPopup(false)
						}
						className={`px-4 py-2 ${
							loading
								? 'cursor-not-allowed'
								: 'cursor-pointer'
						} bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none`}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default ChangeBlogStatusPopup;
