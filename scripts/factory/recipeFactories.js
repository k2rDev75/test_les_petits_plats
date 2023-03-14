// Crée une "usine" de recettes pour générer des éléments de recettes à partir des données

function recipesFactory(data) {
  // Destructure les données pour faciliter l'accès aux propriétés
  const { id, name, time, description, ingredients } = data;

  // Définit l'image de la recette (ici, toutes les recettes ont la même image)
  const picture = `./assets/savoureux.jpeg`;

  // Crée un élément DOM pour la carte de recette
  function getRecipeCardDOM() {
    // Crée un élément 'article' pour la carte de recette et définit son id
    const card = document.createElement("article");
    card.classList.add("recipe_card");
    card.id = id;

    // Crée un élément 'img' pour l'image de la recette
    const image = document.createElement("img");
    image.classList.add("recipe_card__image");
    image.src = picture;
    image.alt = name;

    // Crée un élément 'div' pour contenir les informations de la recette
    const infos = document.createElement("div");
    infos.classList.add("recipe__infos");

    // Crée un élément 'div' pour contenir le titre et le temps de la recette
    const titleTime = document.createElement("div");
    titleTime.classList.add("recipe_title_time");

    // Crée un élément 'h2' pour le titre de la recette
    const title = document.createElement("h2");
    title.classList.add("recipe_title");
    title.textContent = name;

    // Crée un élément 'div' pour le temps de la recette
    const recipeTime = document.createElement("div");
    recipeTime.classList.add("recipe_time");

    // Crée un élément 'img' pour l'icône horloge
    const timeImage = document.createElement("img");
    timeImage.src = "./assets/time.png";
    timeImage.classList.add("time");
    timeImage.alt = "icône horloge";

    // Crée un élément 'p' pour le texte du temps de la recette
    const timeText = document.createElement("p");
    timeText.textContent = `${time} min`;

    // Ajoute l'icône horloge et le texte du temps à l'élément 'recipeTime'
    recipeTime.append(timeImage, timeText);
    // Ajoute le titre et le temps à l'élément 'titleTime'
    titleTime.append(title, recipeTime);

    // Crée un élément 'div' pour contenir les ingrédients et le texte de la recette
    const ingredientsText = document.createElement("div");
    ingredientsText.classList.add("ingredients_recipe_text");

    // Crée un élément 'div' pour contenir la liste des ingrédients
    const ingredientsTab = document.createElement("div");
    ingredientsTab.classList.add("ingredients_tab");

    // Parcourt les ingrédients et crée un élément 'p' pour chaque ingrédient
    ingredients.forEach((ingredient) => {
      const ingredientElement = document.createElement("p");
      ingredientElement.classList.add("ingredient");

      // Crée un élément 'span' pour le nom de l'ingrédient en gras
      const bold = document.createElement("span");
      bold.classList.add("ingredient_bold");
      bold.textContent = `${ingredient.ingredient}:`;

      // Crée un nœud de texte pour la quantité de l'ingrédient
      const quantity = document.createTextNode(ingredient.quantity || "");

      // Ajoute le nom en gras et la quantité à l'élément 'ingredientElement'
      ingredientElement.append(bold, quantity);
      // Ajoute l'élément 'ingredientElement' à l'élément 'ingredientsTab'
      ingredientsTab.appendChild(ingredientElement);
    });

    // Crée un élément 'p' pour la description de la recette
    const desc = document.createElement("p");
    desc.classList.add("recipe_desc");
    desc.textContent = description;

    // Ajoute les éléments 'ingredientsTab' et 'desc' à l'élément 'ingredientsText'
    ingredientsText.append(ingredientsTab, desc);
    // Ajoute les éléments 'titleTime' et 'ingredientsText' à l'élément 'infos'
    infos.append(titleTime, ingredientsText);
    // Ajoute les éléments 'image' et 'infos' à la carte de recette
    card.append(image, infos);

    return card;
  }

  return { getRecipeCardDOM };
}

recipesFactory(recipes);
