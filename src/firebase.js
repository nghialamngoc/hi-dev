import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAGIiD6yMfDudzmFWDqMEd-GRhjmm96uJQ",
  authDomain: "hi-dev-38e39.firebaseapp.com",
  databaseURL: "https://hi-dev-38e39.firebaseio.com",
  projectId: "hi-dev-38e39",
  storageBucket: "hi-dev-38e39.appspot.com",
  messagingSenderId: "968790308624",
  appId: "1:968790308624:web:6e4cb9c402044d186ad795",
  measurementId: "G-RBDGDHSQ1Q"
};

class Firebase {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  loginWithGoogle(setUserLogin) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      setUserLogin(user);
    }).catch(function(error) {
      console.log('loginWithGoogle >>>>>>>', error);
      setUserLogin(null);
    });
  }
}

export default new Firebase();