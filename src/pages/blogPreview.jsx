import parse from 'html-react-parser';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Navbar } from '../components';
import BlogPost from '../components/BlogPost/BlogPost';
function blogPreview() {
	const previewData = useSelector((state) => state.blogContent);
	const [isPopupOpen, setIsPopupOpen] = React.useState(false);
		const navigate = useNavigate();
	

	React.useEffect(() => {
		if (!previewData.data) {
			navigate('/create-blog');
		}
	}, [navigate, previewData.data]);


	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Navbar />
			{/* container or main section */}

			<section className={`w-full ${!isPopupOpen ? 'block' : 'hidden'} flex items-center justify-center text-justify my-10 md:px-5 gap-32 `}>
				<div className="border w-[100%] lg:w-[50%] min-h-screen  p-5 lg:px-20 text-justify shadow-md text-textPrimary overflow-x-scroll flex-wrap text-wrap">
					<div className="w-full">
						<div className="flex items-center py-5">
							<img className="w-10 h-10 rounded-full mr-2 bg-slate-400" />
							<div className="flex flex-col">
								<h3 className="text-lg font-bold">Mdeiom</h3>
								<p className="text-sm text-gray-500">Follow</p>
							</div>
							<div className="ml-auto text-right">
								<p className="text-sm text-gray-500">May 7, 2024</p>
								<p className="text-sm text-gray-500">10:30 AM</p>
							</div>
						</div>
					</div>
					<div style={{wordBreak:'break-all'}} className='text-left'>{parse(previewData.data)}</div>
				</div>

			</section>
			<div className="w-full my-5  pb-10">
				<Button label="Next" className={'float-end bg-blue-200 text-black'} onClick={() => setIsPopupOpen((prev) => !prev)} />
				<Button label="Go Back" className={'float-end'} onClick={() => window.history.back()} />
			</div>
			{/* popup section */}



			<section className={`absolute ${isPopupOpen ? 'block' : 'hidden'} top-0 left-0 z-[99] bg-background  w-full min-h-screen`}>
				<Button label="Close ❌" className={'float-end bg-blue-200 text-black mt-10'} onClick={() => setIsPopupOpen((prev) => !prev)} />

				<BlogPost previewData={previewData} />
			</section>
		</>
	);
}

export default blogPreview;
