import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function App() {
  const [user, setUser] = useState({});
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();

  //Facebook login
  const handleSignInFb = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;

        var user = result.user;

        var accessToken = credential.accessToken;
        setUser(user);
        console.log(user);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  }


  //Github login
  const handleSignInGit = () => {
    firebase
      .auth()
      .signInWithPopup(ghProvider)
      .then((result) => {
        var credential = result.credential;

        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log(user);
        // ...
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('error:', errorCode, errorMessage, email, credential);
        // ...
      });
  }


  //Google Sign in
  const handleSignInGlg = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log(user);
        // ...
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  }



  return (
    <div className="App">
      <button onClick={handleSignInFb}>Sign in with Facebook</button>
      <br />
      <button onClick={handleSignInGit}>Sign in with Github</button>
      <br />
      <button onClick={handleSignInGlg}>Sign in with Google</button>
      <h2>Name: {user.displayName}</h2>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
