import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	endAt,
	getDoc,
	getDocs,
	orderBy,
	query,
	startAt,
	updateDoc,
	where
} from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';

class BlogService {
	constructor() {
		// Initialize anything you need here
	}
	async createPost(postData) {
		try {
			const newPostRef = await addDoc(
				collection(firestore, 'blogs'),
				postData
			);
			return newPostRef.id;
		} catch (error) {
			console.error('Error creating post:', error);
			throw error;
		}
	}

	async getBlogs() {
		try {
			// Create a reference to the 'blogs' collection
			const blogsRef = collection(firestore, 'blogs');
			const q = query(blogsRef, where('isPublicPost', '==', true));
			// Fetch all documents from the collection
			const blogsSnapshot = await getDocs(q);
			// Process each document and extract data
			const blogs = blogsSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			return blogs;
		} catch (error) {
			console.error('Error fetching blogs:', error);
			throw error; // Re-throw the error for proper handling
		}
	}

	async getSinglePost(documentId) {
		try {
			const blogRef = doc(firestore, 'blogs', documentId);
			const blogSnapshot = await getDoc(blogRef);

			if (blogSnapshot.exists) {
				return blogSnapshot.data();
			} else {
				return null;
			}
		} catch (error) {
			console.error('Error fetching blog:', error);
			throw error; // Re-throw for proper handling
		}
	}

	async getUserAllBlogs(userId) {
		const blogRef = collection(firestore, 'blogs');
		const q = query(blogRef, where('user.userId', '==', userId));
		const docs = [];
		try {
			const querySnapshot = await getDocs(q);
			if (querySnapshot.size > 0) {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					docs.push({ ...doc.data(), id: doc.id });
				});
			}
		} catch (error) {
			console.error('Error fetching blog data:', error);
		}



		return docs;
	}



	async getBlogBySearchTerm(searchTerm) {
		const blogRef = collection(firestore, 'blogs');
		
	const q = query(
		blogRef,
		where('isPublicPost', '==', true),
		orderBy('title'), // Order by title field
		startAt(searchTerm),
		endAt(searchTerm + '\uf8ff') // Add unicode character for upper bound
	);

		try {
			const querySnapshot = await getDocs(q);
			const blogs = [];

			if (!querySnapshot.empty && querySnapshot.size > 0) {
				querySnapshot.forEach((doc) => {
					blogs.push({ ...doc.data(), id: doc.id });
				});
			}

			return blogs;
		} catch (err) {
			console.error('Error in search service (blogService):', err);
			// Handle errors appropriately, e.g., throw an error or return an empty array
			return []; // Example error handling
		}
	}

	async updateBlogStatus(blogId, updatedData) {
		if (typeof blogId !== 'string') {
			throw new Error(
				'blogId must be a string representing the document ID.'
			);
		}

		if (
			typeof updatedData !== 'object' ||
			Object.keys(updatedData).length === 0
		) {
			throw new Error(
				'updatedData must be an object containing fields to update.'
			);
		}

		try {
			const docRef = doc(collection(firestore, 'blogs'), blogId);

			await updateDoc(docRef, updatedData);

			return true;
		} catch (error) {
			console.error('Error updating blog status:', error);
			return false;
		}
	}

	async deleteUserBlog(blogId) {
		await deleteDoc(doc(firestore, 'blogs', blogId));
	}
}
const blogService = new BlogService();

export default blogService;
