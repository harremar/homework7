function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("connected " + user.email);
      $(".pName").css("display", "block");
    } else {
      console.log("user is not there");
      $(".pName").css("display", "none");
    }
  });
}

function createUser() {
  let password = "password"; //$("#password").val();
  let email = "mArielleh724@gmail.com";
  let fName = "marielle";
  let lName = "harrell";

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(userCredential.user);
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
  let password = "password"; //$("#password").val();
  let email = "mArielleh724@gmail.com";
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

  // this should do something --want it to get login
  $("#loginbtn").click(function (e) {
    e.preventDefault();
    console.log("login was clicked");
    let btnID = e.currentTarget.id;
    login();
    // if (btnID == "create") {
    //   createUser();
    // } else if (btnID == "login") {
    //   login();
    // } else if (btnID == "signout") {
    //   signOut();
    // }
  });
  // this should do something
  $("#createbtn").click(function (e) {
    e.preventDefault();
    console.log("sign in was clicked");
    let btnID = e.currentTarget.id;
    createUser();
    // if (btnID == "create") {
    //   createUser();
    // } else if (btnID == "login") {
    //   login();
    // } else if (btnID == "signout") {
    //   signOut();
    // }
  });
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
