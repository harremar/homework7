let browseName = document.getElementById("browseName");
let createName = document.getElementById("createName");
let EditName = document.getElementById("EditName");

let loggedIn = false;

var fullName = "";

function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      loggedIn = true;
      console.log("connected " + user.email + " " + loggedIn);
      console.log("auth user " + user.displayName);
      if (user.displayName == null) {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: fullName,
          })
          .then(() => {
            updateSiteWithInfo();
          });
      } else {
        fullName = user.displayName;
        console.log("auth " + fullName);
      }
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
      fullName = "";
      browseName.innerHTML = "Browse";
    }
  });
}

function updateSiteWithInfo() {
  //THESE ELEMENTS AREN'T ON THE PAGE. NEED A CALLBACK??? MAYBE
  $(".createName h2").html("Hey " + fullName + ", create your recipe!");

  $(".editName h2").html("Hey " + fullName + ", edit your recipe!");

  $(".yourName h2").html("Hey " + fullName + ", here are your recipes!");
}

function loadPublicRecipes() {
  // $(".browse").empty();
  $(".foodrecipe").empty();

  $.getJSON("http://localhost:3000/PUBLIC_RECIPES", function (recipes) {
    // console.log(recipes.PUBLIC_RECIPES);
    $(".recipes-holder").empty();
    //loop though all the recipes
    $.each(recipes, function (index, recipe) {
      console.log(recipe.recipeName);
      // should loop through all ingredients in certain recipe

      //FOR THE BROWSER PAGE
      $(".recipes-holder").append(`
      <div class="recipe">
                        <a href="#/public/${index}
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

function loadPublicRecipe(recipeIndex) {
  $.getJSON("http://localhost:3000/PUBLIC_RECIPES", function (recipes) {
    let recipe = recipes[recipeIndex];
    let recipeHTMLString = `<div class="foodrecipe">
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
            <h1>Ingredients:</h1>`;
    $.each(recipe.ingredients, function (index, ingredient) {
      console.log("ingred ", ingredient);
      recipeHTMLString += `<p>${ingredient.ingredient}</p>`;
    });

    recipeHTMLString += `</div><div class="info">
          <h1>Instructions:</h1>`;
    $.each(recipe.instructions, function (index3, instruction) {
      let n = index3++;
      recipeHTMLString += `<p>${instruction.instruction}</p>`;
    });
    recipeHTMLString += `</div>
             <div class="dvEdit">
                 <a href="#/editpizza"><div class="btn">
                     Edit Recipe</div></a>
             </div></div>`;
    $("#app").html(recipeHTMLString);
  });
}

function loadUserRecipe() {
  $(".foodrecipe").empty();
  $.getJSON("http://localhost:3000/USER_RECIPES", function (recipes) {
    console.log(recipes);
    $(".recipes-holder").empty();
    $(".yourRecipes-content").empty();

    $.each(recipes, function (index, recipe) {
      console.log(recipe.recipeName);
      // should loop through all ingredients in certain recipe

      //FOR THE BROWSER PAGE
      $(".recipes-holder").append(`
      <div class="recipe">
                        <a href="#/private/${index}
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

      //FOR THE YOUR RECIPES PAGE
      $(".yourRecipes-content").append(`<div class= "yourRecipeContainer">
      <div class="yourRecipes-holder">
                        <div class="recipe">
                            <div class="${recipe.image}">
                                <a href="#/private/${index}"><div class="viewbtn">View</div></a>
                            </div>
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
                </div>
                <div class="mod-holder">
                    <a href="#/edit">
                        <div class="modbtn" onclick="editRecipe()" >Edit Recipe</div>
                    </a>
                    <a href="#">
                        <div class="modbtn" onclick="deleteRecipe()">Delete</div>
                    </a>
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
function UserRecipeLoad(recipeIndex) {
  $.getJSON("http://localhost:3000/USER_RECIPES", function (recipes) {
    let recipe = recipes[recipeIndex];

    let recipeHTMLString = `<div class="foodrecipe">
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
            <h1>Ingredients:</h1>`;
    $.each(recipe.ingredients, function (index, ingredient) {
      console.log("ingred ", ingredient);
      recipeHTMLString += `<p>${ingredient.ingredient}</p>`;
    });

    recipeHTMLString += `</div><div class="info">
          <h1>Instructions:</h1>`;
    $.each(recipe.instructions, function (index3, instruction) {
      let n = index3++;
      recipeHTMLString += `<p>${instruction.instruction}</p>`;
    });
    recipeHTMLString += `</div>
             <div class="dvEdit">
                 <a href="#/editpizza"><div class="btn">
                     Edit Recipe</div></a>
             </div></div>`;
    $("#app").html(recipeHTMLString);
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
  //gets users password and email input
  let password = $("#password").val(); //$("#password").val();
  let email = $("#email").val();
  //shows password and email in console
  console.log(password + " and " + email);

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

document.addEventListener("DOMContentLoaded", function () {
  const recipeForm = document.querySelector("#recipeForm");
  // const recipeURL = `http://localhost:5000/data.json`;
  const recipeURL = `http://localhost:3000/USER_RECIPES`;

  let allrecipes = [];
  fetch(`${"recipeURL"}`)
    .then((response) => response.json())
    .then((recipeData) =>
      recipeData.foreach(function (recipe) {
        allrecipes = recipeData;
        recipeForm.innerHTML += `<div class="foodrecipe">
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
                <h1>Ingredients:</h1>`;
        $.each(recipe.ingredients, function (index, ingredient) {
          console.log("ingred ", ingredient);
          recipeHTMLString += `<p>${ingredient.ingredient}</p>`;
        });

        recipeHTMLString += `</div><div class="info">
              <h1>Instructions:</h1>`;
        $.each(recipe.instructions, function (index, instruction) {
          let n = index++;
          recipeHTMLString += `<p>${instruction.instruction}</p>`;
        });
        recipeHTMLString += `</div>
                 <div class="dvEdit">
                     <a href="#/editpizza"><div class="btn">
                         Edit Recipe</div></a>
                 </div></div>`;
      })
    ); //end of fetch
  // recipeForm.addEventListener("submit", (e) => {
  //   event.preventDefault();
  //   console.log(e.target);
  //   // additional functionality goes down here!!
  //   const recipeInput = recipeForm.querySelector("#recipeInput").value;
  //   const descriptionInput =
  //     recipeForm.querySelector("#descriptionInput").value;
  //   const timeInput = recipeForm.querySelector("#timeInput").value;
  //   const servingInput = recipeForm.querySelector("#servingInput").value;
  //   for (i = 1; i < ingredCounter + 1; i++) {
  //     const ingredientInput = recipeForm.querySelector("#ind" + i).value;
  //   }
  //   for (i = 1; i < instCounter + 1; i++) {
  //     const instructionInput = recipeForm.querySelector("#inst" + i).value;
  //   }
  //   fetch(`${recipeURL}`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title: titleInput,
  //       image: imageInput,
  //       description: descriptionInput,
  //       time: timeInput,
  //       servings: servingInput,
  //       ingredients: [{ ingredients: ingredientInput }],
  //       instructions: [{ instruction: instructionInput }],
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((recipe) => {
  //       let recipeHTMLString = `<div class="foodrecipe">
  //       <div class="top-section">
  //           <div class="right-content">
  //               <div class="title"><h1>${recipe.recipeName}</h1></div>
  //               <div class="image-${recipe.image}"></div>
  //           </div>
  //           <div class="left-content">
  //               <h2>Description:</h2>
  //               <p>${recipe.description}</p>
  //               <h3>Total time:</h3>
  //               <p>${recipe.time}</p>
  //               <h3>Servings:</h3>
  //               <p>${recipe.servings}</p>
  //           </div>
  //       </div>
  //       <div class="bottom-section">
  //           <div class="info">
  //               <h1>Ingredients:</h1>`;
  //       $.each(recipe.ingredients, function (index, ingredient) {
  //         console.log("ingred ", ingredient);
  //         recipeHTMLString += `<p>${ingredient.ingredient}</p>`;
  //       });

  //       recipeHTMLString += `</div><div class="info">
  //             <h1>Instructions:</h1>`;
  //       $.each(recipe.instructions, function (index3, instruction) {
  //         let n = index3++;
  //         recipeHTMLString += `<p>${instruction.instruction}</p>`;
  //       });
  //       recipeHTMLString += `</div>
  //                <div class="dvEdit">
  //                    <a href="#/editpizza"><div class="btn">
  //                        Edit Recipe</div></a>
  //                </div></div>`;
  //       $("#app").html(recipeHTMLString);
  //     });
  // });
});

//   // everything else we type will go inside this!!
function createRecipe() {
  const recipeForm = document.querySelector("#recipeForm");
  const recipeURL = `http://localhost:3000/USER_RECIPES`;
  console.log("This is the form: ", recipeForm);
  alert("You have created a new recipe");
  console.log("Create Recipe button was clicked");
  let recipeImageText = $("#recipeImageText").val();
  let recipeImage = $("#recipeImage").val();
  let foodName = $("#recipeInput").val();
  let recipeDescription = $("#descriptionInput").val();
  let recipeTime = $("#timeInput").val();
  let recipeServing = $("#servingInput").val();

  for (i = 1; i < ingredCounter + 1; i++) {
    let ind = $("#ind" + i).val();
    console.log("ingredient #", i, " ", ind);
  }
  for (i = 1; i < instCounter + 1; i++) {
    let inst = $("#inst" + i).val();
    console.log("instruction #", i, " ", inst);
  }

  console.log("Recipe Image Text: ", recipeImageText);
  console.log("Recipe Image: ", recipeImage);
  console.log("Name: ", foodName);
  console.log("Description: ", recipeDescription);
  console.log("Time: ", recipeTime);
  console.log("Serving: ", recipeServing);

  fetch(`${recipeURL}`, {
    method: "POST",
    body: JSON.stringify({
      id: Date.now(),
      recipeName: foodName,
      image: recipeImageText,
      description: recipeDescription,
      time: recipeTime,
      servings: recipeServing,
      // ingredients: [{ ingredient: ind }],
      // instructions: [{ instruction: inst }],
    }),
    headers: { "Content-Type": "application/json" },
  });
}

function editRecipe() {
  alert("Lets update your recipe");
  console.log("Lets update your recipe");
}

function editRecipeSubmit() {
  alert("You have updated your recipe");
  console.log("You have updated your recipe");
}

function deleteRecipe() {
  alert("You have deleted your recipe");
  console.log("You have deleted your recipe");
}
//function that gets pageID
function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");
  let publicRecipeIndex = pageID.indexOf("public");
  let publicRecipeName = "";

  let privateRecipeIndex = pageID.indexOf("private");
  let privateRecipeName = "";

  if (publicRecipeIndex == 0) {
    console.log(pageID);
    publicRecipeName = pageID.replace("public/", "");
  }

  if (privateRecipeIndex == 0) {
    console.log(pageID + "hello");
    privateRecipeName = pageID.replace("private/", "");
  }

  console.log("public " + publicRecipeName);
  console.log("private" + privateRecipeName);
  //if no pageID go to home
  if (pageID == "") {
    MODEL.getMyContent("home");
  } else if (publicRecipeName != "") {
    console.log(publicRecipeName);
    loadPublicRecipe(publicRecipeName);
  } else if (privateRecipeName != "") {
    console.log(privateRecipeName);
    UserRecipeLoad(privateRecipeName);
    loadPublicRecipe(publicRecipeName);
  } else {
    //browse page if user is not logged in
    if (pageID == "browse" && loggedIn == false) {
      MODEL.getMyContent(pageID, loadPublicRecipes);
      //browse page if user is loggin in
    } else if (pageID == "browse" && loggedIn == true) {
      MODEL.getMyContent(pageID, loadUserRecipe);
    } else if (pageID == "pizzarecipe") {
      // MODEL.getMyContent(pageID, loadPublicRecipes);
    } else if (pageID == "yourRecipes") {
      MODEL.getMyContent(pageID, loadUserRecipe);
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
