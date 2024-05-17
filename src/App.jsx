import LocomotiveScroll from 'locomotive-scroll';
import { Suspense, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import Cookies from 'universal-cookie';
import { Loading } from './components';
import { login } from './features/authSlice';
import AuthService from './services/auth.service';

const cookies = new Cookies();

function App() {
	const locomotiveScroll = new LocomotiveScroll();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		(async () => {
			// console.log(cookies.get('auth'));
			try {
				const userDetails = await AuthService.getUserDetails();
				if (userDetails !== undefined) {
					dispatch(login(userDetails));
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);

				console.log(error);
			}
			setLoading(false);
		})();
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='max-w-screen-2xl  mx-auto poppins-regular bg-background  '>
			{/* <Navbar /> */}
			<Suspense fallback={<Loading />}>
				<Toaster />
				<Outlet />
			</Suspense>
		</div>
	);
}

export default App;
