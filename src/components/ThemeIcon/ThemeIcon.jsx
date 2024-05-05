import React from 'react';

import moon from '../../assets/icons/moon.png';
import sun from '../../assets/icons/sun.png';

// import useTheme from '../hooks/useThem';

function ThemeIcon() {
	// const [theme, changeTheme] = useTheme();

	const handleThemeChange = () => {
		// changeTheme();
	};

	// console.log(theme);

	return (
		<li onClick={handleThemeChange} className="   px-5  bg-transparent duration-300 flex items-center justify-center gap-[16px] bg-transparent">
			{/* <div className="w-[24px] h-[24px] du cursor-pointer rounded-full bg-backBackground"></div> */}
			<img src={'dark' === 'light' ? moon : sun} className="size-[24px] bg-transparent cursor-pointer " alt="" />
		</li>
	);
}

export default ThemeIcon;
