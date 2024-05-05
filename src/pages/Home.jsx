import React from 'react';
import { BlogCart, HeroSection, Pagination } from '../components';

function Home() {
	return (
		<div className="poppins-regular p-[10px] md:p-[30px] lg:p-[40px]  bg-background">
			{/* animation for heading */}

			<h1 className="font-[700] tracking-[16px] text-[32px]  text-nowrap md:text-[40.8px]  lg:text-[63.8px]  text-center  text-textPrimary  select-none ">
				THE BLOG
			</h1>

			{/* hero  section */}

			<HeroSection />

			{/* resent blog post section */}

			<section className=" ">
				<p className="text-[24px]  leading-[32px] mt-10 mb-5  text-textPrimary h-[32px] text-center py-10 md:text-left ">Recent blog posts</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 place-items-center lg:grid-cols-3 gap-[24px] md:gap-10">
					{Array(10)
						.fill('')
						.map((item, index) => (
							<BlogCart key={index} />
						))}
				</div>
			</section>

			{/* pagination section */}
			<section className="">
				<Pagination />
			</section>

			<footer className="w-full mt-20">
				<div className="w-full h-[40px] flex items-center justify-center gap-[14px] text-textPrimary text-[18px]">
					<p>© 2023</p> <p>Twitter</p> <p>LinkedIn</p> <p>Email</p>
					<p> feed Add to Feedly</p>
				</div>
			</footer>
		</div>
	);
}

export default Home;
