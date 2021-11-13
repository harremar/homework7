let browseName = document.getElementById("browseName");
let createName = document.getElementById("createName");
let EditName = document.getElementById("EditName");

let loggedIn = false;

var User = {
  firstName: "Marielle",
  lastName: "Harrell",
  email: "m@m.com",
};

var fullName = "";

function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      loggedIn = true;
      console.log("connected " + user.email + " " + loggedIn);
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: fullName,
        })
        .then(() => {
          updateSiteWithInfo();
        });
      $("#loginbutton").css("display", "none");
      $("#logoutbutton").css("display", "flex");
      $(".yourRecipesLink").css("display", "flex");
      $(".createRecipesLink").css("display", "flex");
      $(".dvEdit").css("display", "flex");
      browseName.innerHTML = "Browse All";
    } else {
      loggedIn = false;
      console.log("user is not there");
      $("#loginbutton").css("display", "flex");
      $("#logoutbutton").css("display", "none");
      $(".yourRecipesLink").css("display", "none");
      $(".createRecipesLink").css("display", "none");
      $(".dvEdit").css("display", "none");

      browseName.innerHTML = "Browse";

      // console.log("only showing public recipes");
    }
  });
}

function updateSiteWithInfo() {
  let user = firebase.auth().currentUser;

  //THESE ELEMENTS AREN'T ON THE PAGE. NEED A CALLBACK??? MAYBE
  $(".createName h2").html("Hey " + user.displayName + ", create your recipe!");

  $(".editName h2").html("Hey " + user.displayName + ", edit your recipe!");

  $(".yourName h2").html(
    "Hey " + user.displayName + ", here are your recipes!"
  );
}

function loadPublicRecipes() {
  // $(".browse").empty();
  $(".foodrecipe").empty();

  $.getJSON("data/data.json", function (recipes) {
    // console.log(recipes.PUBLIC_RECIPES);
    $(".recipes-holder").empty();
    //loop though all the recipes
    $.each(recipes.PUBLIC_RECIPES, function (index, recipe) {
      console.log(recipe.recipeName);
      //should loop through all ingredients in certain recipe
      // $(recipe.ingredients).each(function (index2, ingredients) {
      //   console.log(ingredients.ingredient);
      // });
      for (i = 0; i < recipe.ingredients.length; i++) {
        console.log(recipe.ingredients[i]);
      }

      //should loop through all instructions in certain recipe
      $(recipe.instructions).each(function (index3, instructions) {
        console.log(instructions.instruction);
      });

      //FOR THE BROWSER PAGE
      $(".recipes-holder").append(`
      <div class="recipe">
                        <a href="#/${recipe.link} 
                        "><div class="${recipe.image}">
                            
                        </div></a>
                        <div class="text-holder">
                            <div class="title">
                                <h1>${recipe.recipeName}</h1>
                            </div>
                            <div class="text">
                                <p>${recipe.description}</p>
                            </div>
                            <div class="info">
                                <div class="time"></div>
                                <div class="words">
                                    <p>${recipe.time}</p>
                                </div>
                            </div>
                            <div class="info">
                                <div class="servings"></div>
                                <div class="words">
                                    <p>${recipe.servings}</p>
                                </div>
                            </div>
                        </div>
                    </div>
      `);

      //FOR THE FOOD RECIPE PAGE -- still working on
      $(".foodrecipe").append(`<div class="foodrecipe">
      <div class="top-section">
          <div class="right-content">
              <div class="title"><h1>${recipe.recipeName}</h1></div>
              <div class="image-${recipe.image}"></div>
          </div>
          <div class="left-content">
              <h2>Description:</h2>
              <p>${recipe.description}</p>
              <h3>Total time:</h3>
              <p>${recipe.time}</p>
              <h3>Servings:</h3>
              <p>${recipe.servings}</p>
          </div>
      </div>
      <div class="bottom-section">
          <div class="info">
              <h1>Ingredients:</h1>
              <p>${recipe.ingredients.ingredient1}</p>
              <p>2 tablespoons Last-Minute Pizza Sauce</p>
              <p>10 slices pepperoni</p>
              <p>1 cup cooked and crumbled Italian sausage</p>
              <p>2 large mushrooms, sliced</p>
              <p>1/4 bell pepper, sliced</p>
              <p>1 tablespoon sliced black olives</p>
              <p>1 cup shredded mozzarella cheese</p>
          </div>
          <div class="info">
              <h1>Instructions:</h1>
              <p>1. Preheat the oven to 475°. Spray pizza pan with nonstick cooking or line a baking sheet with parchment paper.</p>
              <p>2. Flatten dough into a thin round and place on the pizza pan.</p>
              <p>3. Spread pizza sauce over the dough.</p>
              <p>4. Layer the toppings over the dough in the order listed .</p>
              <p>5. Bake for 8 to 10 minutes or until the crust is crisp and the cheese melted and lightly browned.</p>
          </div>
          <div class="dvEdit">
              <a href="#/editpizza"><div class="btn">
                  Edit Recipe</div></a>
          </div>

  </div>`);
    });
  }).fail(function (jqxhr, textStatus, error) {
    console.log(
      "jqxhr: " + jqxhr + " text: " + textStatus + " error: " + error
    );
  });
}

function loadUserRecipe() {
  $(".browse").empty();
  $(".pizzarecipe").empty();
  $.getJSON("data/data.json", function (recipes) {
    // console.log(recipes.USER_RECIPES);
    $.each(recipes.USER_RECIPES, function (index, recipe) {
      console.log("hello there");
      //FOR THE BROWSER PAGE
      console.log("user recipes :))");
      $(".recipes-holder").append(`
      <div class="recipe">
                        <a href="#/${recipe.link} 
                        "><div class="${recipe.image}">
                            
                        </div></a>
                        <div class="text-holder">
                            <div class="title">
                                <h1>${recipe.recipeName}</h1>
                            </div>
                            <div class="text">
                                <p>${recipe.description}</p>
                            </div>
                            <div class="info">
                                <div class="time"></div>
                                <div class="words">
                                    <p>${recipe.time}</p>
                                </div>
                            </div>
                            <div class="info">
                                <div class="servings"></div>
                                <div class="words">
                                    <p>${recipe.servings}</p>
                                </div>
                            </div>
                        </div>
                    </div>
      `);
    });
  }).fail(function (jqxhr, textStatus, error) {
    console.log(
      "jqxhr: " + jqxhr + " text: " + textStatus + " error: " + error
    );
  });
}

//this function create a new user
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
  fullName = fName + " " + lName;
  console.log(fullName);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(userCredential.user);
      // alert("you have created an account " + displayName);

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

//this function hapens when login button is clicked
function login() {
  // let password = "password"; //$("#password").val();
  // let email = "mArielleh724@gmail.com";
  let firstName = "Marielle";
  let lastName = "Harrell";
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
      alert("you have logged in");
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
      alert("you are signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

function createRecipe() {
  alert("You have created a new recipe");
  console.log("You have created a new recipe");
}

function editRecipe() {
  alert("You have updated your recipe");
  console.log("You have updated your recipe");
}
//function that gets pageID
function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  //if no pageID go to home
  if (pageID == "") {
    MODEL.getMyContent("home");
    // $(".underline").css("display", "flex");
  } else {
    if (pageID == "browse" && loggedIn == false) {
      MODEL.getMyContent(pageID, loadPublicRecipes);
    } else if (pageID == "browse" && loggedIn == true) {
      MODEL.getMyContent(pageID, loadUserRecipe, loadPublicRecipes);
    } else if (pageID == "pizzarecipe") {
      MODEL.getMyContent(pageID, loadPublicRecipes);
    } else if (pageID == "yourRecipes") {
      MODEL.getMyContent(pageID, updateSiteWithInfo);
    } else if (pageID == "create") {
      MODEL.getMyContent(pageID, updateSiteWithInfo);
    } else if (pageID == "editpizza") {
      MODEL.getMyContent(pageID, updateSiteWithInfo);
    } else {
      MODEL.getMyContent(pageID);
    }
  }
  // underline(pageID);
}

var ingredCounter = 3;
//ADDS INGREDIENTS
function addIngred() {
  ingredCounter++;
  $(".ingredientForm").append(
    `<input id="ind${ingredCounter}" type="text" placeholder="Ingredient #${ingredCounter} ">`
  );
}
var instCounter = 3;
//ADDS INSTRUCTIONS
function addInst() {
  instCounter++;
  $(".instructionsForm").append(
    `<input id="ind${instCounter}" type="text" placeholder="Instructions #${instCounter} ">`
  );
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
    // console.error(e);
  }
});
