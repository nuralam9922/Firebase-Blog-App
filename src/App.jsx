import LocomotiveScroll from 'locomotive-scroll';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Loading } from './components';
import AuthService from './services/auth.service';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { login } from './features/authSlice';
import { Toaster } from 'react-hot-toast';
const cookies = new Cookies();
function App() {
	const locomotiveScroll = new LocomotiveScroll();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	// const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		(async () => {
			const userId = cookies.get('auth');

			if (userId) {
				const userDetails = await AuthService.getUserDetails(userId);
				const userInfo = {...userDetails,userId}
				dispatch(login(userInfo));
				setLoading(false);
			} else {
				setLoading(false);
				// return navigate('/auth/login');
			}
			setLoading(false);
		})();
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="max-w-screen-2xl  mx-auto poppins-regular bg-background  ">
			{/* <Navbar /> */}
			<Suspense fallback={<Loading />}>
				<Toaster />
				<Outlet />
			</Suspense>
		</div>
	);
}

export default App;
