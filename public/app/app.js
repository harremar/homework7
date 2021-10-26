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
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}
let logoutbutton = document.getElementById("logoutbutton");
let loginbutton = document.getElementById("loginbutton");

let yourRecipesLink = document.getElementById("yourRecpesLink");

function login() {
  //gets users password and email input
  let password = $("#password").val(); //$("#password").val();
  let email = $("#email").val();
  //shows password and email in console
  console.log(password + " and " + email);
  //shows when login button is clicked
  console.log("yay itsss sort of working");
  //this gets rid of loginbutton in nav;
  loginbutton.style.display = "none";
  //this adds the logoutbutton to the nav
  logoutbutton.style.display = "flex";
  //this adds yourrecipes to the nav
  yourRecipesLink.style.display = "flex";

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
  console.log("signout button has been clicked");
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
  //this gets rid of logoutbutton in nav;
  logoutbutton.style.display = "none";
  //this adds the loginbutton to the nav
  loginbutton.style.display = "flex";
  //this removes yourrecipes from the nav
  yourRecipesLink.style.display = "none";
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
