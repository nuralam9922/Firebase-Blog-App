import React from 'react';
import image from '../../assets/demoImages/image.png';
import {ImageComponent} from '../../components';
import { Link } from 'react-router-dom';

const colorSet = [
	{
		textColor: '#6941C6',
		backgroundColor: '#F9F5FF',
	},
	{
		textColor: '#3538CD',
		backgroundColor: '#EEF4FF',
	},
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

function BlogCart({item}) {
	return (
		<div className="w-full min-h-[448px]  flex flex-col  gap-[24px]">
			<Link to={`/blog-details/${item?.id}`}>
				<div className="w-full cursor-pointer h-[278px] overflow-hidden rounded-sm">
					<ImageComponent width="100" height="278px" src={item?.thumbnail || 'https://via.placeholder.com/300'} />
				</div>
			</Link>

			<div className="min-h-[196px] w-full flex flex-col gap-[24px] lg:gap-[15px]">
				<p className="w-full h-[20px] text-textSecondary font-[600] text-[14px]">{item.postDate.split('/').join(' / ')}</p>
				<h1 className=" group  flex gap-[16px] h-20">
					{/* heading */}
					<p
						style={{ wordBreak: 'break-all' }}
						className="text-textPrimary w-full cursor-pointer min-h-10 break-words text-pretty font-[600] text-[23px] text-clip  leading-[32px]"
					>
						{item?.title.split(' ').slice(0,20).join(' 	')}...
					</p>
					<svg
						className="group-hover:rotate-45 duration-150"
						width="24"
						height="28"
						viewBox="0 0 24 28"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M7 21L17 11M17 11H7M17 11V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</h1>
				{/* small description */}
				<p style={{ wordBreak: 'break-all' }} className="text-textAscent cursor-pointer  text-[16px] leading-[24px] w-full">
					{item?.description.slice(0, 100)}...
				</p>

				{/* blog category or types */}
				<div className="w-full select-none h-[24px] flex items-center gap-[8px] flex-wrap ">
					{item.tags.slice(0, 5).map((item, index) => {
						const randomColor = color();

						return (
							<div
								key={index}
								style={{
									backgroundColor: randomColor.backgroundColor,
								}}
								className="capitalize p-4 px-4 rounded-full flex items-center justify-center text-[14px] font-[500] h-[20px] w-[47] leading-[20px] "
							>
								{item}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default BlogCart;
