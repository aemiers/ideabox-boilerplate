

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
var allFavoriteIdeas = [];

saveButton.addEventListener("click", saveIdea);
//searchButton.addEventListener("click", findSavedIdea);
// favoriteButton.addEventListener("click", favoriteIdea);

function saveIdea(title, body) {
  event.preventDefault(event);
  title = titleInput.value;
  body = bodyInput.value;

  var newIdea = new Idea(title, body);
  allSavedIdeas.push(newIdea);

  createNewCard();

  // if (allSavedIdeas.includes(newIdea) === false) allSavedIdeas.push(newIdea);
  // replace this with a for loops
  // error handling, can't save an idea that's already there. look at clearing the form wonce we click save. if the user creates a second one, it's probably intentional
}

function createNewCard() {
  ideaCardGrid.innerHTML = "";
  for (var i = 0; i < allSavedIdeas.length; i++) {
    console.log(allSavedIdeas[i])
    ideaCardGrid.innerHTML += `<section class="idea-card">
          <header class="card-top">
            <button class="favorite-button">
              <img src="images/star.svg" alt="Star button icon" class="star-inactive">
              <img src="images/star-active.svg" alt="Active star button icon" class="star-active hidden">
            </button>
            <button class="delete-button"><img src="images/delete.svg" alt="Delete button icon" class="delete"></button>
          </header>
          <div class="text-area">
            <p class="card-title">${allSavedIdeas[i].title}</p>
          <p class="card-body">${allSavedIdeas[i].body}</p>
            </div>
          <footer class="card-bottom">
            <button class="comment-button">
              <img src="images/comment.svg" alt="Delete button icon" class="delete"></button>
            <label>Comment</label>
          </footer>
        </section>`
  }
}


















// function favoriteIdea () {
//   var clickedIdea = event.target.closest(".favorite-button")
//   if (allFavoriteIdeas.includes(clickedIdea) === false) allFavoriteIdeas.push(clickedIdea);
// }
//
// function deleteIdea() {
//   if (event.target.closest(".card-body")) {
//       var selectedIdea = event.target.closest(".card-body")
//       for (var i = 0; i < allSavedIdeas.length; i++) {
//         if (allSavedIdeas[i].id === Number(selectedIdea.id)) {
//           allSavedIdeas.splice(i, 1);
//         }
//       };
//     };
//   };
