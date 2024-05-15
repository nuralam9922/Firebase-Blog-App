import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Test from './pages/test';

const Home = React.lazy(() => import('./pages/Home'));
const CreateBlog = React.lazy(() => import('./pages/createBlog/CreateBlog'));
const Profile = React.lazy(() => import('./pages/Profile'));
const BlogDetails = React.lazy(() => import('./pages/BlogDetails'));
const SearchPage = React.lazy(() => import('./pages/SearchBlogs'));
const Categories = React.lazy(() => import('./pages/Categories'));
const TrendingBlogs = React.lazy(() => import('./pages/TrendingBlogs'));
const BlogPreview = React.lazy(() => import('./pages/blogPreview'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
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
				path: '/create-blog',
				element: <CreateBlog />,
			},
			{
				path: '/blog-preview',
				element: <BlogPreview />,
			},
			{
				path: '/auth/login',
				element: <Login />,
			},
			{
				path: '/auth/signup',
				element: <Signup />,
			},
			{
				path: '/test',
				element: <Test />,
			},
		],
	},
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>
);
