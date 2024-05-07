import React from 'react';
import { useState } from 'react';
import uploadService from '../services/upload.service';

function Test() {
	const [file, setFile] = useState(null);
	const [uploadedFile, setUploadedFile] = useState(null);
	const handleUpload = async () => {
		const res = await uploadService.uploadFile(file, (url) => setUploadedFile(url));
	};

	// const image = file ? URL.createObjectURL(file) : 'https://via.placeholder.com/200';

	return (
		<div className="flex items-center justify-center min-h-screen w-full flex-col">
			<div className="relative">
				<div className="block size-40 rounded-full border bg-slate-500 overflow-hidden">
					{uploadedFile && <img src={uploadedFile} className="w-full h-full object-cover" alt="" />}
					{/* <img src={image} className="w-full h-full rounded-full border bg-slate-500 object-cover " alt="" /> */}
				</div>
				<input type="file" onChange={(e) => setFile(e.target.files[0])} name="" className="absolute inset-0 opacity-0 cursor-pointer" />
			</div>
			<button onClick={handleUpload} className="block border border-zinc-700 mt-10 py-3 px-10 rounded-md">
				Upload Image
			</button>
		</div>
	);
}

export default Test;
