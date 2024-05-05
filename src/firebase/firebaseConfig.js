import { initializeApp } from 'firebase/app';
import { API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_ID } from '../envConfig/envConfig';
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_ID,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);