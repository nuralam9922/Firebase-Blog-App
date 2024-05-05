import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Navbar } from './components';
import LocomotiveScroll from 'locomotive-scroll';

function App() {
	const locomotiveScroll = new LocomotiveScroll();
	return (
		<div className="max-w-screen-2xl  mx-auto poppins-regular bg-background  ">
			<Suspense fallback={<div>Loading...</div>}>
				<Navbar />
				<Outlet />
			</Suspense>
		</div>
	);
}

export default App;
