import React from 'react';
import image from '../../assets/demoImages/image.png';
import {ImageComponent} from '../../components'

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

function HeroSection() {
	return (
		<section className="">
			<p className="text-[24px] leading-[32px] mt-10 mb-5 text-textPrimary h-[32px] textce">Trending blog posts</p>
			<div className="flex gap-5 flex-col  custom:grid md:grid-cols-2  lg:grid-cols-2 md:gap-[24px] lg:gap-[62px]">
				{/* First column placeholder */}
				<div className="w-full min-h-[432px] flex flex-col  justify-between gap-[32px]">
					<div className="w-full cursor-pointer h-[308px] overflow-hidden rounded-sm">
						<ImageComponent width={100} height={308} src={image} />
					</div>

					<div className="min-h-[196px] w-full flex flex-col gap-[24px] lg:gap-[24px]">
						<p className="w-full h-[20px] text-textSecondary font-[600] text-[14px]">Sunday, 1 Jan 2023s</p>
						<h1 className="group flex gap-[16px]">
							<p className="text-textPrimary w-full cursor-pointer min-h-10 break-words text-pretty font-[600] text-[23px] text-clip leading-[32px]">
								UX review presentationsmmm
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
						{/* Small description */}
						<p className="text-textAscent cursor-pointer text-[16px] leading-[24px]">
							How do you create compelling presentations that wow your colleagues and impress your managers?
						</p>

						{/* Blog category or types */}
						<div className="w-full select-none h-[24px] flex items-center gap-[8px] flex-wrap">
							{['Design', 'Product', 'UX', 'UX'].map((item, index) => {
								const randomColor = color();
								return (
									<div
										style={{ backgroundColor: randomColor.backgroundColor, color: randomColor.textColor }}
										key={index}
										className="capitalize p-4 px-4 rounded-full flex items-center justify-center text-[14px] font-[500] h-[20px] w-[47] leading-[20px]"
									>
										{item}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				{/* Second column placeholder */}
				<div className=" flex gap-[20px] flex-col md:flex-col w-full">
					<div className="w-full  flex flex-col md:flex-row lg:flex-row justify-between gap-[32px]">
						<div className="w-full cursor-pointer h-[278px] rounded-sm">
							<ImageComponent width={100} height={270} src={image} />
						</div>

						<div className="min-h-[196px] w-full flex flex-col gap-[24px] lg:gap-[24px]">
							<p className="w-full min-h-[20px] text-textSecondary font-[600] text-[14px]">Sunday, 1 Jan 2023</p>
							<h1 className="group flex gap-[16px]">
								<p className="text-textPrimary w-full cursor-pointer min-h-10 break-words text-pretty font-[600] text-[23px] text-clip leading-[32px]">
									UX review presentations
								</p>
								<svg
									className="group-hover:rotate-45 duration-150  hidden"
									width="24"
									height="28"
									viewBox="0 0 24 28"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M7 21L17 11M17 11H7M17 11V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</h1>
							{/* Small description */}
							<p className="text-textAscent cursor-pointer text-[16px] leading-[24px]">
								How do you create compelling presentations that wow your colleagues and impress your managers?
							</p>

							{/* Blog category or types */}
							<div className="w-full select-none h-[24px] flex items-center gap-[8px] flex-wrap">
								{['Design', 'Product'].map((item, index) => {
									const randomColor = color();
									return (
										<div
											style={{ backgroundColor: randomColor.backgroundColor, color: randomColor.textColor }}
											key={index}
											className="capitalize p-4 px-4 rounded-full flex items-center justify-center text-[14px] font-[500] h-[20px] w-[47] leading-[20px]"
										>
											{item}
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className="w-full  flex flex-col md:flex-row lg:flex-row justify-between gap-[32px]">
						<div className="w-full cursor-pointer h-[278px] rounded-sm">
							<ImageComponent width={100} height={270} src={image} />
						</div>

						<div className="min-h-[196px] w-full flex flex-col gap-[24px] lg:gap-[24px]">
							<p className="w-full min-h-[20px] text-textSecondary font-[600] text-[14px]">Sunday, 1 Jan 2023</p>
							<h1 className="group flex gap-[16px]">
								<p className="text-textPrimary w-full cursor-pointer min-h-10 break-words text-pretty font-[600] text-[23px] text-clip leading-[32px]">
									UX review presentations
								</p>
								<svg
									className="group-hover:rotate-45 duration-150  hidden"
									width="24"
									height="28"
									viewBox="0 0 24 28"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M7 21L17 11M17 11H7M17 11V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</h1>
							{/* Small description */}
							<p className="text-textAscent cursor-pointer text-[16px] leading-[24px]">
								How do you create compelling presentations that wow your colleagues and impress your managers?
							</p>

							{/* Blog category or types */}
							<div className="w-full select-none h-[24px] flex items-center gap-[8px] flex-wrap">
								{['Design', 'Product'].map((item, index) => {
									const randomColor = color();
									return (
										<div
											style={{ backgroundColor: randomColor.backgroundColor, color: randomColor.textColor }}
											key={index}
											className="capitalize p-4 px-4 rounded-full flex items-center justify-center text-[14px] font-[500] h-[20px] w-[47] leading-[20px]"
										>
											{item}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				{/* third column placeholder */}

				<div className="min-h-[306px] hid  col-span-2">
					<div className="w-full  flex flex-col md:flex-row  justify-between gap-[32px]">
						<div className="w-full cursor-pointer h-[278px] rounded-sm">
							<ImageComponent
								width={100}
								height={270}
								src={
									'https://s3-alpha-sig.figma.com/img/f074/6a8e/91047747031d3bda636eac41f4235b6d?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QdJeab-BsqVr4LtJVl8zhVmmcjOBQbd6tQuQvxxjKyIxuMd60Gs6yIN8ndwrBb4SaLBYzl6rKQGsza5EmFZKnh9wGR1e57~FDxQ-P3kX7UABgz97L-ESliaqvt0VICB6xVI1D1aH-o2VXfN3Xf6Ccf8GMag6nEIaG843UWPQ7VTLlptvT3X4H3ynZGY4CgIajiswUthO~GiDxOzHFPDemb95fzK5XQTpidpsIKL0iUC-2TkqrtrMalpSjl7K-VroBXArvbS8y0KSf7RW6D7~FLAK7QxrpTl4NqECz36zzq8CG3r~IAqqjXtmSrfjAGiKe1Vbbe~oZEwf1n-s~Mqceg__'
								}
							/>
						</div>

						<div className="min-h-[196px] w-full flex flex-col gap-[24px] lg:gap-[24px]">
							<p className="w-full min-h-[20px]  text-textSecondary font-[600] text-[14px]">Sunday, 1 Jan 2023</p>
							<h1 className="group flex  gap-[16px]">
								<p className="text-textPrimary w-full cursor-pointer min-h-10 break-words text-pretty font-[600] text-[23px] text-clip leading-[32px]">
									UX review presentations
								</p>
								<svg
									className="group-hover:rotate-45 duration-150 "
									width="24"
									height="28"
									viewBox="0 0 24 28"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M7 21L17 11M17 11H7M17 11V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</h1>
							{/* Small description */}
							<p className="text-textAscent text-justify  cursor-pointer text-[16px] leading-[24px]">
								A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that
								create a matrix of intersecting points, which can be used to align and organize page elements. Grid systems are used to create
								a consistent look and feel across a website, and can help to make the layout more visually appealing and easier to navigate.
							</p>

							{/* Blog category or types */}
							<div className="w-full select-none h-[24px] flex items-center gap-[8px] flex-wrap">
								{['Design', 'Product'].map((item, index) => {
									const randomColor = color();
									return (
										<div
											style={{ backgroundColor: randomColor.backgroundColor, color: randomColor.textColor }}
											key={index}
											className="capitalize p-4 px-4 rounded-full flex items-center justify-center text-[14px] font-[500] h-[20px] w-[47] leading-[20px]"
										>
											{item}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
