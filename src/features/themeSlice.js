import { createSlice } from '@reduxjs/toolkit';
const theme = localStorage.getItem('theme');

if (theme) {
	document.documentElement.setAttribute('theme', theme);
} else {
	document.documentElement.setAttribute('theme', 'light');
}

const initialState = {
	theme: theme || 'light',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', state.theme);
			document.documentElement.setAttribute('theme', state.theme);
		},
	},
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
