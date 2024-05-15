import LocomotiveScroll from 'locomotive-scroll';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Loading } from './components';
import AuthService from './services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { login } from './features/authSlice';

const cookies = new Cookies();


function App() {
	const locomotiveScroll = new LocomotiveScroll();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	


	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme) {
			document.documentElement.setAttribute('theme', theme );
		} else {
			document.documentElement.setAttribute('theme', 'light');
		}

		setLoading(true);
		(async () => {
			const userId = cookies.get('auth');

			try {
				if (userId) {
					const userDetails = await AuthService.getUserDetails(
						userId
					);
					console.log(userDetails);
					if (userDetails !== undefined) {
						const userInfo = { ...userDetails, userId };
						dispatch(login(userInfo));
					}
					setLoading(false);
				} else {
					setLoading(false);
					
				}
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
