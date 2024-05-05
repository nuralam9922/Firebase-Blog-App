/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				textPrimary: 'var(--textPrimary)',
				textSecondary: 'var(--textSecondary)',
				textAscent: 'var(--textAscent)',
				backBackground: 'var(--backBackground)',
				background: 'var(--background)',
			},
			screens: {
				custom: { min: '890px' },
				customForNavList: { max: '1002px' },
				customMenu: { min: '1002px' },
			},
		},
	},
	plugins: [],
};
