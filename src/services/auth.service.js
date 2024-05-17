import { browserLocalPersistence, createUserWithEmailAndPassword, GoogleAuthProvider, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebaseConfig';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class AuthService {
	constructor() {
		this.googleProvider = new GoogleAuthProvider();
		setPersistence(auth, browserLocalPersistence)
			.then(() => {
				console.log('Persistence set to local');
			})
			.catch((error) => {
				console.error('Error setting persistence:', error);
			});
	}

	async signInWithGoogle(errorState) {
		try {
			const user = await signInWithPopup(auth, this.googleProvider);

			const userId = user.user.uid;
			const userRef = await doc(firestore, 'users', userId);

			const userDocSnap = await getDoc(userRef);

			if (userDocSnap.exists()) {
				cookies.set('auth', userId, { path: '/' });
				const userDetails = await this.getUserDetails(userId);

				return userDetails;
			} else {
				const res = await setDoc(userRef, {
					userName: user.user.displayName,
					userEmail: user.user.email,
					userPhoto: user.user.photoURL,
				});
				if (res) {
					cookies.set('auth', userId, { path: '/' });
				}

				return true;
			}
		} catch (error) {
			errorState(error.message);
			console.error('Error signing in with Google:', error);
			throw error;
		}
	}

	async signUp(name, email, password) {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);

			const userId = user.user.uid;
			const userRef = doc(firestore, 'users', userId);

			await setDoc(userRef, {
				userName: name,
				userEmail: email,
				bio: null,
				userPhoto:
					'data:image/jpeg;base64,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',
			});

			if (user) {
				console.log(userId);
				cookies.set('auth', userId, { path: '/' });
				const userDetails = await this.getUserDetails(userId);
				return userDetails;
			} else return false;
		} catch (error) {
			console.error('Error signing up:', error);
			throw error;
		}
	}

	async signIn(email, password) {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
			const userId = user.user.uid;

			if (userId) {
				cookies.set('auth', userId, { path: '/' });
				const userDetails = await this.getUserDetails(userId);
				return userDetails;
			} else return false;
		} catch (error) {
			console.error('Error signIn with email:', error.message);

			return false;
		}
	}

	// async signInWithGoogle

	async signOut() {
		try {
			await signOut(auth);
			cookies.remove('auth', { path: '/' });
		} catch (error) {
			console.error('Error signing out:', error.message);
			throw error;
		}
	}

	async getUserDetails(id) {
		const userId = id || cookies.get('auth');

		if (!userId) {
			return false;
		}

		try {
			const userRef = doc(firestore, 'users', userId);
			const docSnap = await getDoc(userRef);

			if (docSnap.exists) {
				const userData = docSnap.data();
				return { ...userData, userId };
			} else return false;
		} catch (error) {
			console.log('Error in getUserDetails:', error);
			throw error;
		}
	}

	async updateUserDetails(updatedData) {
		const userId = cookies.get('auth');

		try {
			const docRef = doc(collection(firestore, 'users'), userId);
			await updateDoc(docRef, updatedData);

			const userdet = await this.getUserDetails()
			console.log(userdet);
			return userdet;
		} catch (error) {
			console.error('Error updating document:', error);
		}
	}
}

const authService = new AuthService();

export default authService;
