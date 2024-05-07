import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebaseConfig';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class AuthService {
	constructor() {
		this.googleProvider = new GoogleAuthProvider();
	}

	async signInWithGoogle(errorState) {
		try {
			const user = await signInWithPopup(auth, this.googleProvider);

			const userId = user.user.uid;
			const userRef = doc(firestore, 'users', userId);

			const userDocSnap = await getDoc(userRef);

			if (userDocSnap.exists()) {
				cookies.set('auth', userId, { path: '/' });
				return true;
			} else {
				const res = await setDoc(userRef, {
					userName: user.user.displayName,
					userEmail: user.user.email,
					userPhoto: user.user.photoURL,
				});
				if (res) {
					cookies.set('auth', userId, { path: '/', httpOnly: true });
				}

				return true;
			}
		} catch (error) {
			errorState(error.message);
			console.error('Error signing in with Google:', error.message);
			throw error;
		}
	}

	async signUp(name, email, password) {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);

			const userId = user.user.uid;
			const userRef = doc(firestore, 'users', userId);

			await setDoc(userRef, { userName: name, userEmail: email, userPhoto: null });

			if (user) {
				console.log(userId);
				cookies.set('auth', userId, { path: '/' });
				console.log(cookies.get('auth'));
				return true;
			} else return false;
		} catch (error) {
			console.error('Error signing up:', error.message);
			throw error;
		}
	}

	async signIn(email, password) {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
			const userId = user.user.uid;

			if (userId) {
				cookies.set('auth', userId, { path: '/'});
				return true;
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
			cookies.set('auth', '', { path: '/'});
		} catch (error) {
			console.error('Error signing out:', error.message);
			throw error;
		}
	}

	async getUserDetails() {
		const userId = cookies.get('auth');

		if (!userId) {
			return false;
		}

		try {
			const userRef = doc(firestore, 'users', userId);
			const docSnap = await getDoc(userRef);

			if (docSnap.exists) {
				const userData = docSnap.data();
				return userData;
			} else return false;
		} catch (error) {
			console.log('Error in getUserDetails:', error);
			throw error;
		}
	}
}

const authService = new AuthService();

export default authService;
