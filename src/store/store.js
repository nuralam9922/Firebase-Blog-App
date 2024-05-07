import { configureStore } from '@reduxjs/toolkit';
import blogContentSlice from '../features/blogContentSlice';
import authSlice from '../features/authSlice';
import blogs from '../features/blogs';

export const store = configureStore({
	reducer: {
		blogContent: blogContentSlice,
		authReducer: authSlice,
		blogs: blogs,
	},
});
