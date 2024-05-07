import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebaseConfig';
import Cookies from 'universal-cookie';

class BlogService {
	constructor() {
		// Initialize anything you need here
	}

	async getBlogs() {
		try {
			// Create a reference to the 'blogs' collection
			const blogsRef = collection(firestore, 'blogs');

			// Fetch all documents from the collection
			const blogsSnapshot = await getDocs(blogsRef);
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

	async createPost(postData) {
		try {
			const newPostRef = await addDoc(collection(firestore, 'blogs'), postData);
			return newPostRef.id;
		} catch (error) {
			console.error('Error creating post:', error);
			throw error;
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
}

const blogService = new BlogService();

export default blogService;
