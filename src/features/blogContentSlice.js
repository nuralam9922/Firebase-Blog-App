import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: '',
};

const blogContentSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		addContent: (state, action) => {
			state.data = action.payload;
		},
		removeContent: (state) => {
			state.data = '';
		},
	},
});

export const { addContent, removeContent } = blogContentSlice.actions;
export default blogContentSlice.reducer;
