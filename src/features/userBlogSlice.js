import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blog.service';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const fetchUserBlogs = createAsyncThunk(
	'userBlogs/fetchUserBlogs',
	async () => {
		const userId = cookies.get('auth');
		try {
			const res = await blogService.getUserAllBlogs(userId);
			return res;
		} catch (error) {
			console.error('Failed to fetch user blogs', error);
			throw error;
		}
	}
);

const initialState = {
	blogs: [],
	loading: false,
	error: null,
};

const userBlogsSlice = createSlice({
	name: 'userBlogs', // Slice name
	initialState, // Initial state
	reducers: {
		changeBlogStatus: (state, action) => {
            const existingBlogId = action.payload.id;
            state.blogs.map(blog => {
                if (blog.id === existingBlogId) {
					blog.isPublicPost = !blog.isPublicPost;
                }
            });
            

        },
        
        deleteUserBlog: (state, action) => { 
            const existingBlogId = action.payload.id;
			console.log(existingBlogId);
            state.blogs = state.blogs.filter(blog => blog.id!== existingBlogId);
        }
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserBlogs.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUserBlogs.fulfilled, (state, action) => {
				state.blogs = action.payload;
				state.loading = false;
			})
			.addCase(fetchUserBlogs.rejected, (state) => {
				state.loading = false;
				state.error =
					'something went wrong!!. Please try again later.';
			});
	},
});

export const { changeBlogStatus, deleteUserBlog } = userBlogsSlice.actions;

export default userBlogsSlice.reducer;
