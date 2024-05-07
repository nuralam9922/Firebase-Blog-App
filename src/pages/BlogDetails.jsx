import React from 'react';
import { useEffect } from 'react';
import blogService from '../services/blog.service';
import { useParams } from 'react-router';
import parse from 'html-react-parser';
import { useState } from 'react';
import { Button, Loading, Navbar } from '../components';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

function BlogDetails() {
	const { id } = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { isPending, error, data } = useQuery({
		queryKey: [id],
		queryFn: async () => {
			const response = await blogService.getSinglePost(id);
			return response;
		},
	});

	return (
		<>
			<Navbar />
			<div className="w-full flex items-center justify-center">
				<div className="border w-[100%] lg:w-[50%] min-h-screen  p-5 lg:px-10 text-justify shadow-md text-textPrimary flex-wrap text-wrap">
					{/* {parse(blog?.htmlContent)} */}

					{isPending ? (
						<div>
							<Loading />
						</div>
					) : (
						<>
							<div className="w-full">
								<h1 style={{ wordBreak: 'break-all' }} className='text-3xl font-bold '>{data?.title}</h1>
								<div className="flex items-center py-10">
									<img className="w-10 h-10 rounded-full mr-2 bg-slate-400" src={data.user.userAbater} />
									<div className="flex flex-col">
										<h3 className="text-lg font-bold">{data.user.userName}</h3>
										<p className="text-sm text-gray-500">Follow</p>
									</div>
									<div className="ml-auto text-right">
										<p className="text-sm text-gray-500">{data.postDate.split('/').join(' / ')}</p>
										<p className="text-sm text-gray-500">{data?.postTime}</p>
									</div>
								</div>
							</div>
							<div dangerouslySetInnerHTML={{ __html: data?.htmlContent }}></div>
						</>
					)}
				</div>
			</div>
			<div className="w-full py-20 items-center justify-center flex">
				<Link to={'/'}>
					<Button label="go to home" />
				</Link>
			</div>
		</>
	);
}

export default BlogDetails;
