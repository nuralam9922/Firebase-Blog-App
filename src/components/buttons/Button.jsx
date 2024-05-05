import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Optional: for styling

const Button = ({ onClick, label, className, disabled }) => {
	const handleClick = () => {
		if (onClick && !disabled) {
			onClick();
		}
	};

	return (
		<button
			className={`text-blue-700  hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 ${className}`}
			onClick={handleClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
};

Button.propTypes = {
	onClick: PropTypes.func,
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
};

export default Button;
