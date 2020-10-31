

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
bodyInput.addEventListener('keyup', disableSaveButton);
titleInput.addEventListener('keyup', disableSaveButton);
window.addEventListener("load", createNewCard);
//searchButton.addEventListener("click", findSavedIdea);
// favoriteButton.addEventListener("click", favoriteIdea);
ideaCardGrid.addEventListener("click", favoriteCard);


function saveIdea(title, body) {
  event.preventDefault(event);

  disableSaveButton();

  title = titleInput.value;
  body = bodyInput.value;

  var newIdea = new Idea(title, body);
  allSavedIdeas.push(newIdea);

  // localStorage.setItem("saved ideas", JSON.stringify(allSavedIdeas));

  createNewCard();

  clearInputFields();



  // if (allSavedIdeas.includes(newIdea) === false) allSavedIdeas.push(newIdea);
  // replace this with a for loops
  // error handling, can't save an idea that's already there. look at clearing the form wonce we click save. if the user creates a second one, it's probably intentional
}

function createNewCard() {
  //rename function function to displayUserCards()
  //create a new function "getStoredIdeas"
  // allSavedIdeas = JSON.parse(localStorage.getItem("saved ideas"));
  //
  // if (allSavedIdeas.length)
  ideaCardGrid.innerHTML = "";
  for (var i = 0; i < allSavedIdeas.length; i++) {
    console.log(allSavedIdeas[i])
    ideaCardGrid.innerHTML += `<section class="idea-card">
          <header class="card-top">
            <button class="favorite-button" id="${allSavedIdeas[i].id}">
              <img src="images/star.svg" alt="Star button icon" class="star-inactive">
            </button>
            <button class="delete-button"><img src="images/delete.svg" alt="Delete button icon" class="delete" id="${allSavedIdeas[i].id}"></button>
          </header>
          <div class="text-area">
            <p class="card-title">${allSavedIdeas[i].title}</p>
          <p class="card-body">${allSavedIdeas[i].body}</p>
            </div>
          <footer class="card-bottom">
            <button class="comment-button">
              <img src="images/comment.svg" alt="Delete button icon" class="delete"></button>
            <label class="comment-word">Comment</label>
          </footer>
        </section>`
  }
}

function clearInputFields() {
  titleInput.value = "";
  bodyInput.value = "";
}


function disableSaveButton(event) {
  if (titleInput.value === '' || bodyInput.value === '') {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}


function favoriteCard(event) {
  for(var i =0; i < allSavedIdeas.length; i++) {
    if(event.target.parentElement.id === `${allSavedIdeas[i].id}`) {
      allFavoriteIdeas.push(`${allSavedIdeas[i]}`);
      console.log(allFavoriteIdeas);
      event.target.parentElement.innerHTML = `
      <img src="images/star-active.svg" alt="Active star button icon" class="star-active">
      `
    }
  }
}

ideaCardGrid.addEventListener("click", deleteIdea);

//need to set delete button to the id of the class

function deleteIdea(event) {
    if (event.target.classList.contains('delete-button')) {
    event.target.parentElement.parentElement.remove();
   }
  removeHtml(event);
  // removeLocalStorage();
}

function removeHtml(event) {
  for (var i = 0; i < allSavedIdeas.length; i++) {
    debugger;
    if(event.target.parentElement.parentElement.parentElement.id === `${allSavedIdeas[i].id}`) {
      allSavedIdeas[i].splice(i, 1);
    }
  }
};
//might want to bind when we create the card to the unique id

// removeLocalStorage() {
//
// }
