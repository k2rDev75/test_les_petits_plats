const filterTagsContainer = document.querySelector(".filter_tags");
const filterElements = document.querySelectorAll(".element");
const elementsOfTags = document.querySelectorAll(".element");

function createTag(element) {
  // Validation pour s'assurer que le tag n'est créé qu'une seule fois pour chaque élément de la liste de filtres
  if (element.style.display === "none") return;

  const tag = document.createElement("div");
  tag.classList.add("tags");

  // Code HTML commun aux tags
  const tagHtml = `
    <p>${element.innerText}</p>
    <img src="./assets/close.png" class="close_tag" alt="Fermer le tag">
  `;
  tag.innerHTML = tagHtml;

  // Ajout du tag au conteneur filterTags
  filterTagsContainer.appendChild(tag);

  // Mise à jour du style de l'élément original pour qu'il ne soit plus affiché
  element.style.display = "none";

  // Catégorie de l'élément
  const category = element.getAttribute("categorie");
  if (category === "ingredient") {
    tag.setAttribute("categorie", "ingredient");
    tag.style.background = "#3282F7";
    toggleFormFieldDisplay("ingredients");
  } else if (category === "appliance") {
    tag.setAttribute("categorie", "appliance");
    tag.style.background = "#68D9A4";
    toggleFormFieldDisplay("devices");
  } else if (category === "ustensil") {
    tag.setAttribute("categorie", "ustensil");
    tag.style.background = "#ED6454";
    toggleFormFieldDisplay("ustensils");
  }
}

// Fonction pour afficher ou masquer le champ de formulaire associé à la catégorie
function toggleFormFieldDisplay(fieldName) {
  const modalBg = document.querySelector(`.${fieldName}_list`);
  const placeholder = document.getElementsByName(fieldName)[0];
  if (modalBg.classList.contains("none")) {
    modalBg.classList.remove("none");
  } else {
    modalBg.classList.add("none");
    placeholder.placeholder =
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  }
}

const allIngredients = document.querySelectorAll(".ingredient_tag");
const allDevices = document.querySelectorAll(".device_tag");
const allUstensils = document.querySelectorAll(".ustensil_tag");

elementsOfTags.forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector(".search_error").style.display = "none";
    createTag(element);
    function displayRecipeFilter() {
      document.getElementById("search").value = "";

      let allTags = Array.from(document.querySelectorAll(".tags"));
      inputRecipeaArray = recipes.filter((recipe) => {
        return allTags.every((tag) => {
          switch (tag.getAttribute("categorie")) {
            case "ingredient":
              return recipe.ingredients.some((ingredient) => {
                return (
                  ingredient.ingredient.toLowerCase() ===
                  tag.innerText.toLowerCase()
                );
              });
            case "appliance":
              return recipe.appliance
                .toLowerCase()
                .includes(tag.innerText.toLowerCase());
            case "ustensil":
              return recipe.ustensils.some((ustensil) => {
                return ustensil.toLowerCase() === tag.innerText.toLowerCase();
              });
            default:
              return false;
          }
        });
      });

      displayRecipe(inputRecipeaArray);
    }

    function filterElements() {
      allIngredients.forEach((ingredientOnList) => {
        ingredientOnList.style.display = "none";
        inputRecipeaArray.forEach((remainRecipes) => {
          remainRecipes.ingredients.forEach((ingredient) => {
            if (
              ingredient.ingredient
                .toLowerCase()
                .includes(ingredientOnList.innerText.toLowerCase())
            ) {
              ingredientOnList.style.display = "block";
            }
          });
        });
      });

      allDevices.forEach((applianceOnList) => {
        applianceOnList.style.display = "none";
        inputRecipeaArray.forEach((remainRecipes) => {
          if (
            remainRecipes.appliance
              .toLowerCase()
              .includes(applianceOnList.innerText.toLowerCase())
          ) {
            applianceOnList.style.display = "block";
          }
        });
      });

      allUstensils.forEach((ustensilOnList) => {
        ustensilOnList.style.display = "none";
        inputRecipeaArray.forEach((remainRecipes) => {
          remainRecipes.ustensils.forEach((ustensil) => {
            if (
              ustensil
                .toLowerCase()
                .includes(ustensilOnList.innerText.toLowerCase())
            ) {
              ustensilOnList.style.display = "block";
            }
          });
        });
      });
    }
    const closeTags = document.querySelectorAll(".close_tag");

    closeTags.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        element.style.display = "block";
        const tagContainer = event.target.closest("div");
        if (tagContainer) {
          tagContainer.remove();
        }

        inputRecipeaArray = [];
        displayRecipeFilter();
        filterElements();
      });
    });

    displayFilteredRecipes();
    displayFilteredRecipesTags();
  });
});

function displayFilteredRecipesTags() {
  // Récupération de tous les tags sélectionnés
  const selectedTags = Array.from(document.querySelectorAll(".tags"));

  // Filtre de recettes en fonction des tags sélectionnés
  const filteredRecipes = recipes.filter((recipe) => {
    return selectedTags.every((tag) => {
      switch (tag.getAttribute("categorie")) {
        case "ingredient":
          return recipe.ingredients.some((ingredient) => {
            return (
              ingredient.ingredient.toLowerCase() ===
              tag.innerText.toLowerCase()
            );
          });
        case "appliance":
          return recipe.appliance
            .toLowerCase()
            .includes(tag.innerText.toLowerCase());
        case "ustensil":
          return recipe.ustensils.some((ustensil) => {
            return ustensil.toLowerCase() === tag.innerText.toLowerCase();
          });
        default:
          return false;
      }
    });
  });

  // Vérification si des recettes ont été trouvées
  if (filteredRecipes.length === 0) {
    // Affichage d'un message d'erreur
    document.querySelector(".error_research").style.display = "block";
    document.querySelector(".search_error").style.display = "none";
    
    return;
  }else {
    document.querySelector(".error_research").style.display = "none";

  }

  // Affichage des recettes filtrées
  displayRecipe(filteredRecipes);
}
