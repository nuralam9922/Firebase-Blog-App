import 'draft-js/dist/Draft.css';
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import Editor from '../../Editor/Editor';
import './CreateBlog.css';
import { useSelector } from 'react-redux';

import parse from 'html-react-parser';
import useValidateUserAccess from '../../hooks/useValidateUserAccess';
import { useEffect } from 'react';

function CreateBlog() {
	const previewData = useSelector((state) => state.blogContent);
	const navigate = useNavigate();
	const { userStatus,user } = useValidateUserAccess();

	useEffect(() => {
		if (userStatus === false) {
			navigate('/auth/login');
		}
	}, [userStatus]);

	return (
		<>
			<div className=" min-h-screen  duration-0  ">
				<div className="w-full border  p-3 relative top-0 flex items-start justify-center">
					<Editor />
				</div>
				<div className="w-full flex justify-end py-5 flex-col md:flex-row items-center gap-5 md:text-start ">
					<Link to={'/'}>
						<Button label={`Go to Home `} className={'px-20'} />
					</Link>
					{previewData.data.length > 50 ? (
						<Link to={'/blog-preview'}>
							<Button label="Click for Next 👉" className={'px-20 bg-blue-600 text-white'} />
						</Link>
					) : null}
				</div>
			</div>
		</>
	);
}

export default CreateBlog;
