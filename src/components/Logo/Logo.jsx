import React from 'react';
import logo from '../../assets/logo/blackLogo.png';
import logo2 from '../../assets/logo/whiteLogo.png';
import { useSelector } from 'react-redux';


function Logo({ Width = 140, height = 40 }) {
	// const [theme, changeTheme] = useTheme();
	const { theme } = useSelector((state) => state.theme);

	console.log(theme);

	return (
		<h1 style={{ width: Width + 'px', height: height + 'px' }} className="text-left bg-transparent">
			{/* Append a query string parameter with a unique value to force browser to reload the image */}
			<img src={'light' === theme ? logo : logo2} className="w-full h-full bg-transparent" alt="" />
		</h1>
	);
}

export default Logo;
