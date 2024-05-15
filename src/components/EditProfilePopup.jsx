import React from 'react';
import { useState } from 'react';
import useUploadImage from '../hooks/useUploadImage';
import authService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/authSlice';
import LoadingButton from './LoadingButton';

function EditProfilePopup({ user, showPopup, setShowPopup }) {
	const [name, setName] = useState(user?.userName);
	const [userBio, setUserBio] = useState(user?.bio);
	const [userPhoto, setUserPhoto] = useState();

	const [updating,setUpdating] = useState(false)

	const { uploadImage, loading ,uploadPercentage} = useUploadImage();

	const dispatch = useDispatch()

	const handelUserDetailsUpdate = async () => {
		let imageUrl;
		if (userPhoto) {
			imageUrl = await uploadImage(userPhoto);
		}

		if (name !== '' && userPhoto !== '') {
			const updatedUserDetails = {
				userName: name,
				bio: userBio,
				userPhoto: imageUrl ? imageUrl : user?.userPhoto,
				userEmail: user.userEmail,
				userId: user.userId,
			};
			
			setUpdating(true);
			const res = await authService.updateUserDetails(updatedUserDetails);
			dispatch(updateUser(res))
			setShowPopup(false);
			setUpdating(false);

		}
	};

	const handelImagePreview = (e) => {
		const file = e.target.files[0];
		setUserPhoto(file);
	};

	

	

	return (
		<div
			className={`fixed  top-0 z-[999] left-0 min-h-screen items-center justify-center flex w-full bg-opacity-65 bg-black ${
				showPopup ? 'flex' : 'hidden'
			}`}
		>
			<div className="w-96 min-h-[30rem] bg-white border rounded-md">
				<div className="flex items-center justify-start flex-col text-black   p-2">
					<div>
						<h1 className="text-xl font-bold text-center">Edit Profile</h1>
						<p className="text-center">Edit your profile details</p>
					</div>

					<div className="relative mt-3 flex flex-col items-center justify-center cursor-pointer">
						<img
							src={userPhoto ? URL.createObjectURL(userPhoto) : user?.userPhoto}
							alt=""
							className="bg-slate-400 size-32 rounded-full cursor-pointer"
						/>
						<input onChange={handelImagePreview} type="file" name="" id="" className="absolute top-0 inset-1 opacity-0" />
						{/* edit icon react icon */}

						<div className="mt-2">
							<svg
								xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6  cursor-pointer"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
						</div>
					</div>
					<div className="w-full mt-3 flex flex-col gap-3">
						<div className="inputGroup ">
							<label htmlFor="" className="block">
								Enter Your Name
							</label>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								type="text"
								placeholder="Name"
								className="w-full py-2 text-black outline-none border indent-5 mt-2 focus:border-blue-400 bg-transparent rounded-lg"
							/>
						</div>
						<div className="inputGroup ">
							<label htmlFor="" className="block">
								Enter Your Bio
							</label>
							<textarea
								value={userBio}
								onChange={(e) => setUserBio(e.target.value)}
								name=""
								className="w-full py-2 px-4 overflow-scroll outline-none border  mt-2 focus:border-blue-400 bg-transparent rounded-lg"
								id=""
							></textarea>
						</div>
					</div>

					<div className="w-full h-2 bg-white border my-4 rounded-full">
						<div style={{width: `${uploadPercentage}%`}} className={` h-full duration-200 rounded-full bg-green-400`}></div>
					</div>
					<div className="flex w-full items-center justify-between gap-5 m-3">
						<button onClick={() => setShowPopup(false)} className="w-full py-2 px-10 bg-blue-400 rounded-lg text-white" type="button">
							Cancel
						</button>
						{updating ? (
							<LoadingButton label={'Updating ...'} className={'w-full py-2 px-10 bg-blue-400 rounded-lg text-white'} />
						) : (
							<button onClick={handelUserDetailsUpdate} className="w-full py-2 px-10 bg-blue-400 rounded-lg text-white" type="button">
								Update
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditProfilePopup;
