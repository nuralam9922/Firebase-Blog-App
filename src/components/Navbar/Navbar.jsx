import React from 'react';
import { Button, Logo } from '../../components';

import './Navbar.css';

import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

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
		title: 'Create Blog',
		link: '/create-blog',
	},
	{
		title: 'Categories',
		link: '/categories',
	},
	{
		title: 'Profile',
		link: '/profile',
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
					{/* search btn
					<li className="bg-transparent cursor-pointer">
						<div className="p-2 border-2 flex items-center justify-between gap-5 rounded-full px-5">
							<IoSearch /> Search..
						</div>
					</li> */}
					<Link to={'/auth/login'}>
						<Button label="Login" className={'text-[18px]'} />
					</Link>
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
