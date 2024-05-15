import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	theme: localStorage.getItem('theme'),
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