// Definition de la fonction pour afficher les recettes
function displayRecipe(inputArray) {
  // Sélection de la section des cartes
  const cardsSection = document.querySelector(".cards");
  // Effacement de tout contenu existant dans la section des cartes
  cardsSection.innerHTML = "";

  // Boucle sur chaque recette dans l'entrée
  inputArray.forEach((recipe) => {
    // Récupération du code HTML pour la carte de recette à partir de la factory de recette
    const { getRecipeCardDOM } = recipesFactory(recipe);
    // Ajout de la carte de recette à la section des cartes
    cardsSection.appendChild(getRecipeCardDOM());
  });
}

// Affichage des recettes initiales
displayRecipe(recipes);


