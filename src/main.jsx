/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

const Home = React.lazy(() => import('./pages/Home'));
const CreateBlog = React.lazy(() => import('./pages/CreateBlog'));
const Profile = React.lazy(() => import('./pages/Profile'));
const BlogDetails = React.lazy(() => import('./pages/BlogDetails'));
const SearchPage = React.lazy(() => import('./pages/SearchBlogs'));
const Categories = React.lazy(() => import('./pages/Categories'));
const TrendingBlogs = React.lazy(() => import('./pages/TrendingBlogs'));

const router = createBrowserRouter([
	{
		path: '/',
		// element: <Home />,
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/create-blog',
				element: <CreateBlog />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
			{
				path: '/blog-details/:id',
				element: <BlogDetails />,
			},
			{
				path: '/search',
				element: <SearchPage />,
			},
			{
				path: '/categories',
				element: <Categories />,
			},
			{
				path: '/trending-blogs',
				element: <TrendingBlogs />,
			},
		],
	},
	{
		path: '/auth/login',
		element: <div>Login</div>
	},
	{
		path: '/auth/signup',
		element: <div>Signup</div>
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
