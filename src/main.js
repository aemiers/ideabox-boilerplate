

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
var newIdea;

saveButton.addEventListener("click", saveIdea);
searchButton.addEventListener("click", findSavedIdea);
favoriteButton.addEventListener("click", favoriteIdea);

function saveIdea(title, body) {
  title = titleInput.value;
  body = bodyInput.value;

  newIdea = new Idea(title, body);

  allSavedIdeas.push(title, body);

  if (allSavedIdeas.includes(newIdea) === false) allSavedIdeas.push(newIdea);
}


function findSavedIdea() {

}

function favoriteIdea () {

}

function deleteIdea() {

}
