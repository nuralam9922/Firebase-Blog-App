import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import blogContentSlice from '../features/blogContentSlice';
import themeSlice from '../features/themeSlice';
import userBlogSlice from '../features/userBlogSlice';
export const store = configureStore({
	reducer: {
		blogContent: blogContentSlice,
		authReducer: authSlice,
		userBlogs: userBlogSlice,
		theme: themeSlice
	},
});
