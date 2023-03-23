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
// Fonction pour effectuer une recherche globale dans les recettes
function globalSearch() {
  // Récupère la valeur du champ de recherche, la convertit en minuscules et supprime les espaces au début et à la fin
  const searchField = document
    .getElementById("search")
    .value.toLowerCase()
    .trim();

  // Initialise un tableau vide pour stocker les recettes correspondantes
  const inputArray = [];

  // Parcourt toutes les recettes
  recipes.forEach((recipe) => {
    // Vérifie si le nom de la recette contient le texte recherché
    if (recipe.name.toLowerCase().includes(searchField)) {
      // Ajoute la recette au tableau inputArray
      inputArray.push(recipe);
    } else {
      // Parcourt tous les ingrédients de la recette
      recipe.ingredients.forEach((ingredient) => {
        // Vérifie si un ingrédient contient le texte recherché
        if (ingredient.ingredient.toLowerCase().includes(searchField)) {
          // Ajoute la recette au tableau inputArray
          inputArray.push(recipe);
        }
      });
      // Vérifie si la description de la recette contient le texte recherché
      if (recipe.description.toLowerCase().includes(searchField)) {
        // Ajoute la recette au tableau inputArray
        inputArray.push(recipe);
      }
    }
  });

  // Affiche le tableau inputArray dans la console
  console.log(
    "🚀 ~ file: research.js:28 ~ inputArray ~ inputArray:",
    inputArray
  );
  // Affiche ou masque le message d'erreur en fonction du nombre de résultats de recherche
  if (inputArray.length === 0) {
    document.querySelector(".error_research").style.display = "block";
  } else {
    document.querySelector(".error_research").style.display = "none";
  }

  // Affiche les recettes correspondantes en supprimant les doublons à l'aide de l'objet Set
  displayRecipe([...new Set(inputArray)]);
}

// Sélectionne le bouton de recherche
const buttonSearch = document.querySelector("button");

// Ajoute un écouteur d'événement click au bouton de recherche pour appeler la fonction globalSearch
buttonSearch.addEventListener("click", () => {
  globalSearch();
});

// Sélectionne l'élément d'entrée de recherche
const searchInput = document.querySelector("#search");

// Ajoute un écouteur d'événement input à l'élément d'entrée de recherche
searchInput.addEventListener("input", () => {
  // Si la longueur du texte est supérieure ou égale à 3 caractères, appelle la fonction globalSearch et masque le message d'erreur "search_error"
  if (searchInput.value.length >= 3) {
    globalSearch();
    document.querySelector(".search_error").style.display = "none";
  }
  // Si la longueur du texte est supérieure à 0 et inférieure à 3 caractères, affiche les recettes d'origine et affiche le message d'erreur "search_error"
  if (searchInput.value.length > 0 && searchInput.value.length < 3) {
    displayRecipe(recipes);
    document.querySelector(".search_error").style.display = "block";
  }
  // Si la longueur du texte est égale à 0, affiche les recettes d'origine et masque les messages d'erreur "search_error" et "error_research"
  if (searchInput.value.length === 0) {
    displayRecipe(recipes);
    document.querySelector(".search_error").style.display = "none";
    document.querySelector(".error_research").style.display = "none";
  }
});
