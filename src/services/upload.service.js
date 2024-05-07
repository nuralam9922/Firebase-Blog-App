import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

class UploadService {
	constructor() {
		this.storage = getStorage();
	}

	async uploadFile(file, callBack) {
		console.log('File details:', file); // Log file information for debugging

		const storageRef = ref(this.storage, `files/${file.name}`); // Use correct storage reference path

		try {
			const uploadTask = uploadBytesResumable(storageRef, file);

			// Handle upload progress and errors (optional)
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload progress:', progress + '%');
				},
				(error) => {
					console.error('Upload error:', error);
					// Handle errors appropriately, e.g., display error message to user
				},
				() => {
					// Upload completed successfully
					getDownloadURL(uploadTask.snapshot.ref)
						.then((downloadURL) => {
							if (callBack) {
								callBack(downloadURL);
							}
							// Perform additional actions after successful upload, e.g., save download URL to database
						})
						.catch((error) => {
							console.error('Error getting download URL:', error);
							// Handle errors appropriately
						});
				}
			);

			return uploadTask.promise; // Return the upload promise for potential chaining
		} catch (error) {
			console.error('Error creating upload task:', error);
			// Handle errors appropriately, e.g., display error message to user
			throw error; // Re-throw the error to allow caller to handle it
		}
	}
}

const uploadService = new UploadService();
export default uploadService;
