import React from 'react';

function BlogCartSkeleton() {
	return (
		<div className="w-full min-h-[448px] flex flex-col gap-[24px] animate-pulse">
			{/* Thumbnail skeleton */}
			<div className="w-full h-[278px] bg-gray-300 rounded-sm"></div>

			<div className="min-h-[196px] w-full flex flex-col gap-[24px] lg:gap-[15px]">
				{/* Date skeleton */}
				<div className="w-full h-[20px] bg-gray-300"></div>

				{/* Title skeleton */}
				<h1 className="w-full cursor-pointer min-h-[32px] bg-gray-300"></h1>

				{/* Description skeleton */}
				<div className="w-full h-[72px] bg-gray-300"></div>

				{/* Category skeleton */}
				<div className="w-full h-[24px] flex items-center gap-[8px] flex-wrap">
					<div className="p-4 px-4 rounded-full bg-gray-300"></div>
					<div className="p-4 px-4 rounded-full bg-gray-300"></div>
					<div className="p-4 px-4 rounded-full bg-gray-300"></div>
					<div className="p-4 px-4 rounded-full bg-gray-300"></div>
				</div>
			</div>
		</div>
	);
}

export default BlogCartSkeleton;
