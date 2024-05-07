import React from 'react';
import { Button, Logo } from '../../components';

import './Navbar.css';

import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoClose, IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { PiEngine } from 'react-icons/pi';
import { GoPencil } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { BiLogIn } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

const navList = [
	{
		title: 'Home',
		link: '/',
	},

	{
		title: 'Trending Blogs',
		link: '/trending-blogs',
	},

	{
		title: 'Categories',
		link: '/categories',
	},

];

const mobileMenu = (setIsOpen, isOpen) => {
	const animationClass = isOpen ? 'mobileMenuAnimation' : 'animationOut';

	return (
		<div
			className={`absolute w-full  h-screen ${
				isOpen && 'customMenu:hidden'
			} bg-[#1A1A1A] backdrop-blur-3xl flex items-center justify-center text-textPrimary ${animationClass}`}
		>
			{/* close icon */}
			<div onClick={() => setIsOpen((prev) => !prev)} className="absolute top-5 cursor-pointer right-5 text-white text-3xl">
				<IoClose />
			</div>
			<ul className="flex flex-col gap-[24px] text-center text-2xl">
				{navList.map((list, index) => (
					<Link onClick={() => setIsOpen((prev) => !prev)} to={list.link} className="bg-transparent " key={index}>
						<li className="text-white ">{list.title}</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const { user } = useSelector((state) => state.authReducer);

	return (
		<div
			style={{
				backdropFilter: 'blur(10px)',
				background: 'transparent',
			}}
			className="w-full p-[20px] sticky top-0  z-50 md:p-[30px] lg:p-[40px] h-[72px]  flex items-center justify-between"
		>
			<div className="logo bg-transparent">
				<Logo Width="180" height="40" />
			</div>
			<div className="flex items-center justify-between  h-[40px] gap-[14px] text-textPrimary leading-[24px] bg-transparent">
				<ul className=" items-center hidden  customForNavList:hidden md:flex justify-between gap-[14px] bg-transparent">
					{navList.map((list) => (
						<Link key={list.title} to={list.link} className="bg-transparent">
							<li className="p-[8px] bg-transparent text-[18px]">{list.title}</li>
						</Link>
					))}

					{user ? (
						<Link to={'/create-blog'}>
							<button className={'text-textPrimary border-2 py-2 px-5 flex items-center justify-between gap-2 rounded-md'}>
								<GoPencil />
								Create Blog
							</button>
						</Link>
					) : (
						<Link to={'/auth/login'}>
							<button className={'text-textPrimary border-2 py-2 px-5 flex items-center justify-between gap-2 rounded-md'}>
								<BiLogIn />
								Login
							</button>
						</Link>
					)}

					{user && (
						<Link to={'/profile'}>
							<button
								className={
									'text-textPrimary border-2 py-2 px-5 flex items-center justify-between gap-2 rounded-md hover:text-white hover:bg-blue-400'
								}
							>
								<CgProfile />
								Profile
							</button>
						</Link>
					)}
				</ul>

				<div onClick={toggleMenu} className="size-[32px] border block cursor-pointer customMenu:hidden">
					<HiMenu className="w-full h-full" />
				</div>
			</div>

			{/* mobile menu */}

			{isOpen && mobileMenu(setIsOpen, isOpen)}
		</div>
	);
}

export default Navbar;
