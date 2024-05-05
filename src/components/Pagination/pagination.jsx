import React from 'react';

function Pagination() {
	return (
		<div className="min-h-[61px] w-full flex flex-col items-center justify-between md:flex-row  gap-10 border-t-2 py-10 mt-10">
			<div className="h-[20px] w-[86px] flex items-center justify-between gap-[8px] cursor-pointer">
				<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M15.8334 10.4998H4.16675M4.16675 10.4998L10.0001 16.3332M4.16675 10.4998L10.0001 4.6665"
						stroke="#667085"
						strokeWidth="1.67"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>

				<p className="text-textPrimary font-[500] text-[14px] leading-[20px]">Previous</p>
			</div>

			{/* diddle */}

			<div className="  h-[40px] flex gap-[5px]">
				<button type="button" className="w-[40px] flex items-center justify-center bg-[#F9F5FF] text-[#7F56D9] rounded-[8px] ">
					1
				</button>
				{[2, 3].map((item, index) => {
					return (
						<button key={item} type="button" className="w-[40px] text-textPrimary flex items-center justify-center  rounded-[8px] ">
							{item}
						</button>
					);
				})}
				<button type="button" className="w-[40px] flex items-center text-textPrimary justify-center  rounded-[8px] ">
					...
				</button>
				{[8, 9, 10].map((item, index) => {
					return (
						<button key={item} type="button" className="w-[40px] text-textPrimary flex items-center justify-center  rounded-[8px] ">
							{item}
						</button>
					);
				})}
			</div>

			<div className="h-[20px] w-[66px] flex items-center justify-between gap-[5px] cursor-pointer">
				<p className="text-textPrimary font-[500] text-[14px] leading-[20px]">Next</p>
				<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4.16663 10.4998H15.8333M15.8333 10.4998L9.99996 4.6665M15.8333 10.4998L9.99996 16.3332"
						stroke="#667085"
						strokeWidth="1.67"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</div>
	);
}

export default Pagination;
