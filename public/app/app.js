function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("connected " + user.email);
      // $(".pName").css("display", "block");
      $("#loginbutton").css("display", "none");
      $("#logoutbutton").css("display", "flex");
      $("#yourRecipesLink").css("display", "flex");
    } else {
      console.log("user is not there");
      $("#loginbutton").css("display", "flex");
      $("#logoutbutton").css("display", "none");
      $("#yourRecipesLink").css("display", "none");
      // $(".pName").css("display", "none");
    }
  });
}

function createUser() {
  console.log("signin was clicked");
  let password = $("#cpassword").val();
  let email = $("#cemail").val();
  let fName = $("#fName").val();
  let lName = $("#lName").val();
  console.log(password + " and " + email);
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
      alert("you have created an account");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert("error");
      // ..
    });
}
// //this gets elements i want to change when user is logged in or logged out
// let logoutbutton = document.getElementById("logoutbutton");
// let loginbutton = document.getElementById("loginbutton");
// let yourRecipesLink = document.getElementById("yourRecpesLink");

//this function hapens when login button is clicked
function login() {
  //gets users password and email input
  let password = $("#password").val(); //$("#password").val();
  let email = $("#email").val();
  //shows password and email in console
  console.log(password + " and " + email);
  //shows when login button is clicked
  console.log("yay itsss sort of working");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("signed in");
      alert("you have logged in")
      $("#loginbutton").css("display", "none");
      $("#logoutbutton").css("display", "flex");
      $("#yourRecipesLink").css("display", "flex");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
}

//this function happens when the logout button is clicked
function signOut() {
  console.log("signout button has been clicked");
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
      alert("you are signed out")
      $("#loginbutton").css("display", "none");
      $("#logoutbutton").css("display", "flex");
      $("#yourRecipesLink").css("display", "flex");
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
