

var bodyInput = document.querySelector("#body-input");
var cardBody = document.querySelector(".card-body")
var cardTitle = document.querySelector(".card-title");
var deleteButton = document.querySelector(".delete-button")
var favoriteButton = document.querySelector(".favorite-button");
var ideaCardGrid = document.querySelector(".idea-card-grid");
var saveButton = document.querySelector(".save-button");
var searchButton = document.querySelector(".search-button");
var titleInput = document.querySelector("#title-input");

var allSavedIdeas = [];
var allFavoriteIdeas = []
var newIdea;

saveButton.addEventListener("click", saveIdea);
searchButton.addEventListener("click", findSavedIdea);
favoriteButton.addEventListener("click", favoriteIdea);

function saveIdea(title, body) {
  event.preventDefault(event);
  title = titleInput.value;
  body = bodyInput.value;

  newIdea = new Idea(title, body);
  allSavedIdeas.push(newIdea);

  if (allSavedIdeas.includes(newIdea) === false) allSavedIdeas.push(newIdea);
  console.log(allSavedIdeas);
}


function findSavedIdea(searchInput) {

}

function favoriteIdea () {
  var clickedIdea = event.target.closest(".favorite-button")
  if (allFavoriteIdeas.includes(clickedIdea) === false) allFavoriteIdeas.push(clickedIdea);
}

function deleteIdea() {
  if (event.target.closest(".card-body")) {
      var selectedIdea = event.target.closest(".card-body")
      for (var i = 0; i < allSavedIdeas.length; i++) {
        if (allSavedIdeas[i].id === Number(selectedIdea.id)) {
          allSavedIdeas.splice(i, 1);
        }
      };
    };
  };
