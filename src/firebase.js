import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';

export const firebaseConfig = {
	apiKey: 'AIzaSyD5zGGQugA0k4xxqBVPwQkq9e1t9Yv-9W0',
	authDomain: 'howmuch-f5bdf.firebaseapp.com',
	projectId: 'howmuch-f5bdf',
	storageBucket: 'howmuch-f5bdf.appspot.com',
	messagingSenderId: '36868704034',
	appId: '1:36868704034:web:13079b62ca6d5d3c00877b',
};

if (!firebase.apps.length) {
	// firebase.initializeApp({});
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app(); // if already initialized, use that one
}

export default firebase;
//Listen for file selection
