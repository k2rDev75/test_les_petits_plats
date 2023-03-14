// // Définition de la fonction globalSearch
// function globalSearch() {
//   // Récupération de la valeur de l'input de recherche
//   const searchField = document
//     .getElementById("search")
//     .value.toLowerCase()
//     .trim();

//   // Filtrage des recettes pour n'afficher que celles correspondant à la recherche
//   const inputArray = recipes.filter((recipe) => {
//     // Recherche dans le nom de la recette
//     if (recipe.name.toLowerCase().includes(searchField)) {
//       return true;
//     }
//     // Recherche dans les ingrédients
//     const ingredientsFound = recipe.ingredients.some((ingredient) =>
//       ingredient.ingredient.toLowerCase().includes(searchField)
//     );
//     if (ingredientsFound) {
//       return true;
//     }
//     // Recherche dans la description
//     if (recipe.description.toLowerCase().includes(searchField)) {
//       return true;
//     }
//     return false;
//   });
//   console.log("🚀 ~ file: research.js:28 ~ inputArray ~ inputArray:", inputArray)

//   // Affichage du message si aucun menu n'est trouvé
//   if (inputArray.length === 0) {
//     document.querySelector(".error_research").style.display = "block"
//   } else {
//     document.querySelector(".error_research").style.display = "none";
//   }
//   // Affichage des recettes filtrées
//   displayRecipe([...new Set(inputArray)]);
// }

// // Récupération du bouton de recherche
// const buttonSearch = document.querySelector("button");
// // Ajout d'un écouteur d'événement au clic sur le bouton
// buttonSearch.addEventListener("click", () => {
//   globalSearch();
// });

// // Récupération de l'input de recherche
// const searchInput = document.querySelector("#search");
// // Ajout d'un écouteur d'événement à chaque fois que l'utilisateur tape quelque chose dans l'input de recherche
// searchInput.addEventListener("input", () => {
//   // Si la recherche contient au moins 3 caractères, on lance la recherche
//   if (searchInput.value.length >= 3) {
//     globalSearch();
//     document.querySelector(".search_error").style.display = "none";

//   }
//   if (searchInput.value.length > 0 && searchInput.value.length < 3) {
//     displayRecipe(recipes);
//     document.querySelector(".search_error").style.display = "block";
//   }
//   if (searchInput.value.length === 0) {
//     displayRecipe(recipes);
//     document.querySelector(".search_error").style.display = "none";
//     document.querySelector(".error_research").style.display = "none";
//   }
// });
function globalSearch() {
  const searchField = document
    .getElementById("search")
    .value.toLowerCase()
    .trim();

  const inputArray = [];

  recipes.forEach((recipe) => {
    if (recipe.name.toLowerCase().includes(searchField)) {
      inputArray.push(recipe);
    } else {
      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.toLowerCase().includes(searchField)) {
          inputArray.push(recipe);
        }
      });
      if (recipe.description.toLowerCase().includes(searchField)) {
        inputArray.push(recipe);
      }
    }
  });

  console.log(
    "🚀 ~ file: research.js:28 ~ inputArray ~ inputArray:",
    inputArray
  );

  if (inputArray.length === 0) {
    document.querySelector(".error_research").style.display = "block";
  } else {
    document.querySelector(".error_research").style.display = "none";
  }

  displayRecipe([...new Set(inputArray)]);
}

const buttonSearch = document.querySelector("button");

buttonSearch.addEventListener("click", () => {
  globalSearch();
});

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", () => {
  if (searchInput.value.length >= 3) {
    globalSearch();
    document.querySelector(".search_error").style.display = "none";
  }
  if (searchInput.value.length > 0 && searchInput.value.length < 3) {
    displayRecipe(recipes);
    document.querySelector(".search_error").style.display = "block";
  }
  if (searchInput.value.length === 0) {
    displayRecipe(recipes);
    document.querySelector(".search_error").style.display = "none";
    document.querySelector(".error_research").style.display = "none";
  }
});
