import React from 'react';
import image from '../../assets/demoImages/image.png';
import { ImageComponent } from '../../components';
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import PostDeletePopup from '../PostDeletePopup';
import ChangeBlogStatusPopup from '../ChangeBlogStatusPopup';
import { useRef } from 'react';
import { useEffect } from 'react';
import { CgClose } from 'react-icons/cg';

const colorSet = [
	{
		textColor: '#C11574',
		backgroundColor: '#FDF2FA',
	},
	{
		textColor: '#027A48',
		backgroundColor: '#ECFDF3',
	},
	{
		textColor: '#C4320A',
		backgroundColor: '#FFF6ED',
	},
];

const color = () => {
	return colorSet[Math.floor(Math.random() * colorSet.length)];
};

function BlogCart({ item, showDots = false }) {
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const [showChangeBlogStatusPopup, setShowChangeBlogStatusPopup] =
		useState(false);
	const [showTray, setShowTray] = useState(false);

	const title =
		item?.title.split(' ').length > 10
			? `${item?.title.split(' ').slice(0, 10).join(' 	')}...`
			: item?.title;

	return (
		<div className='w-full h-auto flex flex-col  gap-[24px] relative overflow-hidden shadow-sm'>
			{/* only in profile page  */}
			<div
				style={{ display: showDots ? 'flex' : 'none' }}
				className='w-full h-[40px]  rounded-sm absolute z-10 top-0 flex items-center justify-between text-4xl'>
				{item.isPublicPost === true ? (
					<div className='capitalize p-1 px-7 scale-90 rounded-full flex items-center justify-center text-[14px] font-[500]  leading-[20px] bg-green-600  text-white '>
						public
					</div>
				) : (
					<div className='capitalize p-1 px-7 scale-90 rounded-full flex items-center justify-center text-[14px] font-[500]  leading-[20px] bg-red-600  text-white '>
						Private
					</div>
				)}

				<BsThreeDotsVertical
					onClick={() => setShowTray(!showTray)}
					className='text-black bg-white h-full rounded-bl-md cursor-pointer group'
				/>
				{/* Toolbar viseable only in profile page */}
				<div
					style={{ display: showTray ? 'block' : 'none' }}
					className='w-60   bg-white absolute right-3 top-16 rounded-md  group-hover:flex flex-col items-center justify-center shadow-md overflow-hidden'>
					<p
						onClick={() => setShowTray(false)}
						className='absolute top-0 right-0 text-2xl bg-red-200 hover:bg-red-400 hover:text-white p-2 cursor-pointer'>
						<CgClose />
					</p>

					<p
						onClick={() => {
							setShowChangeBlogStatusPopup(false);
							setShowDeletePopup(true);
							setShowTray(false);
						}}
						className='text-base py-4 w-full hover:bg-slate-200 p-2 cursor-pointer'>
						Delete Post
					</p>
					<p
						onClick={() => {
							setShowDeletePopup(false);
							setShowChangeBlogStatusPopup(true);
							setShowTray(false);
						}}
						className='text-base py-4 w-full hover:bg-slate-200 p-2 cursor-pointer'>
						Change Blog Status
					</p>
				</div>
			</div>

			<Link to={`/blog-details/${item?.id}`}>
				<div className='w-full cursor-pointer h-[278px] overflow-hidden rounded-sm'>
					<ImageComponent
						width='100'
						height='278px'
						src={
							item?.thumbnail ||
							'https://via.placeholder.com/300'
						}
					/>
				</div>
			</Link>

			<div className='min-h-[136px] w-full flex flex-col gap-[24px] lg:gap-[15px]'>
				{/* <p className="w-full h-[20px] text-textSecondary font-[600] text-[14px]">{item?.postDate?.split('/').join(' / ')}</p> */}
				<Link to={`/blog-details/${item?.id}`}>
					<h1 className=' group  flex gap-[16px] h-20'>
						{/* heading */}
						<p
							style={{ wordBreak: 'break-all' }}
							className='text-textPrimary w-full cursor-pointer min-h-10 break-words text-pretty font-[600] text-[23px] text-clip  leading-[32px]'>
							{title}
						</p>
						<svg
							className='group-hover:rotate-45 duration-150'
							width='24'
							height='28'
							viewBox='0 0 24 28'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M7 21L17 11M17 11H7M17 11V21'
								stroke='#1A1A1A'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</h1>
				</Link>

				{/* blog category or types */}
				<div className='w-full select-none  flex items-center gap-[8px] flex-wrap '>
					{item?.tags?.slice(0, 3).map((item, index) => {
						const randomColor = color();

						return (
							<div
								key={index}
								style={{
									backgroundColor:
										randomColor.backgroundColor,
								}}
								className='capitalize p-4 px-4 rounded-full flex items-center justify-center text-[14px] font-[500] h-[20px] w-[47] leading-[20px] '>
								{item}
							</div>
						);
					})}
				</div>
			</div>

			<PostDeletePopup
				showDeletePopup={showDeletePopup}
				setShowDeletePopup={setShowDeletePopup}
				blogDetails={item}
			/>
			<ChangeBlogStatusPopup
				showChangeBlogStatusPopup={showChangeBlogStatusPopup}
				setShowChangeBlogStatusPopup={setShowChangeBlogStatusPopup}
				blogDetails={item}
			/>
		</div>
	);
}

export default BlogCart;
