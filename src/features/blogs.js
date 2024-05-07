// reducers/blogReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blog.service';

// Define the asynchronous thunk
export const fetchSinglePost = createAsyncThunk('blog/fetchSinglePost', async (postId, { rejectWithValue }) => {
	try {
		const response = await blogService.getBlogs();
		return response; // Return the response directly
	} catch (error) {
		// Return error message using rejectWithValue
		return rejectWithValue(error.message);
	}
});

const blogSlice = createSlice({
	name: 'blog',
	initialState: {
		blog: {},
		loading: false,
		error: null,
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchSinglePost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSinglePost.fulfilled, (state, action) => {
				state.loading = false;
				state.blog = action.payload; // Set the blog directly to the response
			})
			.addCase(fetchSinglePost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});



export default blogSlice.reducer;
