import firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebaseConfig';


export const initializeFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}



export const handleGoogleSignIn = () => {

    var googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            var {displayName, email} = result.user;

            const user = {
                isSignedIn: true,
                name: displayName,
                email: email,
                success: true,
                isFieldValid: true
            };
            return user;
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });

}


export const facebookSignIn = () => {

    var fbProvider = new firebase.auth.FacebookAuthProvider();

    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            var credential = result.credential;
            var user = result.user;
            var accessToken = credential.accessToken;
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
}


export const signUp = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;

        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = 'error.message';
            console.log(error);
            console.log(error.message);
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = error;
            newUserInfo.success = false;
            return newUserInfo;
        });
}