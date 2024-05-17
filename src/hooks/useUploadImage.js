import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useUploadImage = () => {
	const [loading, setLoading] = useState(false);
	const [uploadPercentage , setUploadPercentage ] = useState(0);
	const storage = getStorage();
	const uploadImage = async (file) => {
		setLoading(true); 

		const storageRef = ref(storage, `files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

	
		const toastId = toast.loading('Uploading...');
		let uploadTaskId = null;
		
		return new Promise((resolve, reject) => {
			
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					setUploadPercentage (((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2));
				},
				(error) => {
					// Handle errors
					console.error('Upload error:', error);
					setLoading(false); 
					toast.error('Upload failed'); 
					reject(error); 
					setUploadPercentage(0);
				},
				() => {
					// Handle successful upload
					getDownloadURL(uploadTask.snapshot.ref)
						.then((downloadURL) => {
							setLoading(false); 
							toast.remove(toastId);
							toast.remove(uploadTaskId);
							toast.success('Thumbnail Upload successful'); 
							resolve(downloadURL); 
							setUploadPercentage(0);
						})
						.catch((error) => {
							console.error('Download URL error:', error);
							setLoading(false); 
							toast.error('Thumbnail Upload failed');
							reject(error);
						});
				}
			);
		});
	};

	return { uploadImage, loading, uploadPercentage  };
};

export default useUploadImage;
