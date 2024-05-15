import React from 'react';

import moon from '../../assets/icons/moon.png';
import sun from '../../assets/icons/sun.png';
import { useSelector } from 'react-redux';

// import useTheme from '../hooks/useThem';

function ThemeIcon() {
	const {theme} = useSelector((state) => state.theme);
	return (
		<li  className=" bg-transparent duration-300 flex items-center justify-center gap-[16px]  ">
			<img src={'light' === theme ? moon : sun} className="size-[24px] bg-transparent cursor-pointer " alt="" />
		</li>
	);
}

export default ThemeIcon;
