function tagLists(listRecipes) {
  // Récupère les éléments HTML qui vont accueillir les listes d'ingrédients, d'appareils et d'ustensiles
  const ingredientsList = document.querySelector(".ingredients_list");
  const devicesList = document.querySelector(".devices_list");
  const ustensilsList = document.querySelector(".ustensils_list");

  // Initialise les tableaux qui vont contenir les éléments HTML pour les ingrédients, les appareils et les ustensiles
  const ingredientsArray = [];
  const devicesArray = [];
  const ustensilsArray = [];

  // Parcoure les recettes pour récupérer les ingrédients, les appareils et les ustensiles
  listRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientsTab = ingredient.ingredient;
      ingredientsArray.push(
        `<li class="ingredient_tag element" categorie="ingredient">${ingredientsTab.toLowerCase()}</li>`
      );
    });

    const devices = recipe.appliance;
    devicesArray.push(
      `<li class="device_tag element" categorie="appliance">${devices.toLowerCase()}</li>`
    );

    recipe.ustensils.forEach((ustensil) => {
      ustensilsArray.push(
        `<li class="ustensil_tag element" categorie="ustensil">${ustensil.toLowerCase()}</li>`
      );
    });
  });

  // Supprime les doublons des tableaux d'ingrédients, d'appareils et d'ustensiles
  const newIngredientsList = [...new Set(ingredientsArray)];
  const newDevicesList = [...new Set(devicesArray)];
  const newUstensilsList = [...new Set(ustensilsArray)];

  // Ajoute les tableaux d'ingrédients, d'appareils et d'ustensiles dans les éléments HTML correspondants
  ingredientsList.innerHTML += `<ul class="tag_list">${newIngredientsList.join(
    ""
  )}</ul>`;
  devicesList.innerHTML += `<ul class="tag_list">${newDevicesList.join(
    ""
  )}</ul>`;
  ustensilsList.innerHTML += `<ul class="tag_list">${newUstensilsList.join(
    ""
  )}</ul>`;
}

tagLists(recipes);

// Ajouter un écouteur d'événement à tous les éléments avec la classe 'down_button'
const btnModals = document.querySelectorAll(".down_button");
btnModals.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // Vérifier si l'élément cliqué a la classe 'down_ingredients'
    if (event.target.classList.contains("down_ingredients")) {
      toggleModalVisibilityAndPlaceholder(
        ".ingredients_list",
        "ingredients",
        "Rechercher un ingrédient",
        "Ingrédients"
      );
    } else if (event.target.classList.contains("down_devices")) {
      toggleModalVisibilityAndPlaceholder(
        ".devices_list",
        "devices",
        "Rechercher un appareil",
        "Appareils"
      );
    } else if (event.target.classList.contains("down_ustensils")) {
      toggleModalVisibilityAndPlaceholder(
        ".ustensils_list",
        "ustensils",
        "Rechercher un ustensile",
        "Ustensiles"
      );
    }
  });
});

function toggleModalVisibilityAndPlaceholder(
  modalSelector,
  placeholderName,
  placeholderTextOpen,
  placeholderTextClose
) {
  // Obtenir l'élément modal et son placeholder
  const modalElement = document.querySelector(modalSelector);
  const placeholder = document.getElementsByName(placeholderName)[0];

  // Changer le texte du placeholder
  placeholder.placeholder = placeholderTextOpen;

  // Basculer la visibilité du modal
  if (modalElement.classList.contains("none")) {
    modalElement.classList.remove("none");
  } else {
    modalElement.classList.add("none");
    placeholder.placeholder = placeholderTextClose;
  }
}

function displayFilteredRecipes() {
  const searchIngredientTag = document.getElementById("ingredients");
  const searchDeviceTag = document.getElementById("devices");
  const searchUstensilTag = document.getElementById("ustensils");

  searchIngredientTag.addEventListener("input", filterIngredients);
  searchDeviceTag.addEventListener("input", filterDevices);
  searchUstensilTag.addEventListener("input", filterUstensils);
  

  function filterIngredients() {
    // Récupération de la valeur saisie dans le champ de recherche
    const ingredientTagValue = searchIngredientTag.value.toLowerCase();
    // Récupération de tous les éléments avec la classe '.ingredient_tag'
    const allIngredients = document.querySelectorAll(".ingredient_tag");
    // Récupération de l'élément qui contient les ingrédients à afficher
    const toDisplay = document.querySelector(".ingredients_list");
    // Affichage de la liste d'ingrédients
    toDisplay.classList.remove("none");

    // Boucle sur tous les ingrédients
    allIngredients.forEach((ingredient) => {
      // Récupération du contenu HTML de l'ingrédient
      let test = ingredient.innerHTML;
      // Vérification si la valeur saisie est incluse dans le contenu HTML de l'ingrédient
      if (test.toLowerCase().includes(ingredientTagValue)) {
        // Affichage de l'ingrédient
        ingredient.style.display = "";
      } else {
        // Cache de l'ingrédient
        ingredient.style.display = "none";
      }
    });
  }

  // Fonction pour filtrer les appareils en fonction de la valeur entrée dans le champ de recherche
  function filterDevices() {
    // Récupère la valeur entrée dans le champ de recherche et la convertit en minuscule
    const deviceTagValue = searchDeviceTag.value.toLowerCase();
    // Récupère tous les éléments avec la classe 'device_tag'
    const allDevices = document.querySelectorAll(".device_tag");
    // Récupère le conteneur qui va afficher les résultats
    const toDisplay = document.querySelector(".devices_list");
    // Affiche le conteneur
    toDisplay.classList.remove("none");

    // Pour chaque appareil
    allDevices.forEach((device) => {
      // Récupère le texte de l'appareil
      let test = device.innerHTML;
      // Si le texte contient la valeur entrée dans le champ de recherche
      if (test.toLowerCase().includes(deviceTagValue)) {
        // Affiche l'appareil
        device.style.display = "";
      } else {
        // Cache l'appareil
        device.style.display = "none";
      }
    });
  }

  // Fonction pour filtrer les ustensiles en fonction de la valeur entrée dans le champ de recherche
  function filterUstensils() {
    // Récupère la valeur entrée dans le champ de recherche et la convertit en minuscule
    const ustensilTagValue = searchUstensilTag.value.toLowerCase();
    // Récupère tous les éléments avec la classe 'ustensil_tag'
    const allUstensils = document.querySelectorAll(".ustensil_tag");
    // Récupère le conteneur qui va afficher les résultats
    const toDisplay = document.querySelector(".ustensils_list");
    // Affiche le conteneur
    toDisplay.classList.remove("none");

    // Pour chaque ustensile
    allUstensils.forEach((ustensil) => {
      // Récupère le texte de l'ustensile
      let test = ustensil.innerHTML;
      // Si le texte contient la valeur entrée dans le champ de recherche
      if (test.toLowerCase().includes(ustensilTagValue)) {
        // Affiche l'ustensile
        ustensil.style.display = "";
      } else {
        // Cache l'ustensile
        ustensil.style.display = "none";
      }
    });
  }
}

