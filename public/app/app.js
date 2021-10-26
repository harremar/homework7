function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("connected " + user.email);
      // $(".pName").css("display", "block");
    } else {
      console.log("user is not there");
      // $(".pName").css("display", "none");
    }
  });
}

function createUser() {
  console.log("signin was clicked");
  let password = $("#password").val();
  let email = $("#email").val();
  let fName = $("#fName").val();
  let lName = $("#lName").val();
  console.log(password);
  console.log(email);
  console.log(fName);
  console.log(lName);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(userCredential.user);
      console.log("check 1 2 3");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

function login() {
  let password = $("password").val(); //$("#password").val();
  let email = $("email").val();
  console.log(password + " and " + email);
  console.log("yay its sort of working");
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("signed in");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}
//function that gets pageID
function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  //if no pageID go to home
  if (pageID == "") {
    MODEL.getMyContent("home");
  } else {
    MODEL.getMyContent(pageID);
  }
}

function initListener() {
  //this gets page content
  $(window).on("hashchange", route);
  route();
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListener();
  } catch {
    console.error(e);
  }
});
