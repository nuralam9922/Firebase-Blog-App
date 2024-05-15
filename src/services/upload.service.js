import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

class UploadService {
	constructor() {
		this.storage = getStorage();
	}

	async uploadFile(file) {
		let downloadImageURL = null;
		console.log('File details:', file); // Log file information for debugging

		const storageRef = ref(this.storage, `files/${file.name}`); // Use correct storage reference path
		const uploadTask = uploadBytesResumable(storageRef, file);

		getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
			return downloadURL;
		});

		// return downloadImageURL;
	}
}

const uploadService = new UploadService();
export default uploadService;
