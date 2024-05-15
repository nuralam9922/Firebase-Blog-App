import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useUploadImage = () => {
	const [loading, setLoading] = useState(false);
	const [uploadPercentage , setUploadPercentage ] = useState(0);
	const storage = getStorage();
	const uploadImage = async (file) => {
		setLoading(true); // Set loading to true when starting the upload

		const storageRef = ref(storage, `files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		// Show toast when upload starts
		const toastId = toast.loading('Uploading...');
		let uploadTaskId = null;
		// Wrap the upload process in a Promise
		return new Promise((resolve, reject) => {
			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					setUploadPercentage (((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2));
				},
				(error) => {
					// Handle errors
					console.error('Upload error:', error);
					setLoading(false); // Set loading to false on error
					toast.error('Upload failed'); // Show error toast
					reject(error); // Reject the Promise on error
					setUploadPercentage(0);
				},
				() => {
					// Handle successful upload
					getDownloadURL(uploadTask.snapshot.ref)
						.then((downloadURL) => {
							setLoading(false); // Set loading to false on successful upload
							toast.remove(toastId);
							toast.remove(uploadTaskId);
							toast.success('Thumbnail Upload successful'); // Show success toast
							resolve(downloadURL); // Resolve the Promise with the download URL
							setUploadPercentage(0);
						})
						.catch((error) => {
							console.error('Download URL error:', error);
							setLoading(false); // Set loading to false on error
							toast.error('Thumbnail Upload failed'); // Show error toast
							reject(error); // Reject the Promise on error
						});
				}
			);
		});
	};

	return { uploadImage, loading, uploadPercentage  };
};

export default useUploadImage;
