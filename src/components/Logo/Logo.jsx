import React from 'react';
import logo from '../../assets/logo/blackLogo.png';
import logo2 from '../../assets/logo/whiteLogo.png';


function Logo({ Width = 140, height = 40 }) {
	// const [theme, changeTheme] = useTheme();



	return (
		<h1 style={{ width: Width + 'px', height: height + 'px' }} className="text-left bg-transparent">
			{/* Append a query string parameter with a unique value to force browser to reload the image */}
			<img src={'light' === 'light' ? logo : logo2} className="w-full h-full bg-transparent" alt="" />
		</h1>
	);
}

export default Logo;