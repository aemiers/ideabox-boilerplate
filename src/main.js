var bodyInput = document.querySelector("#body-input");
var cardBody = document.querySelector(".card-body")
var cardTitle = document.querySelector(".card-title");
var deleteButton = document.querySelector(".delete-button")
var favoriteButton = document.querySelector(".favorite-button");
var ideaCardGrid = document.querySelector(".idea-card-grid");
var saveButton = document.querySelector(".save-button");
var searchButton = document.querySelector(".search-button");
var titleInput = document.querySelector("#title-input");
var searchInput = document.querySelector('.search-input');
var showStarredIdeasButton = document.querySelector('.starred-ideas-button')

var allSavedIdeas = [];
var allFavoriteIdeas = [];

saveButton.addEventListener("click", saveIdea);
bodyInput.addEventListener('keyup', disableSaveButton);
titleInput.addEventListener('keyup', disableSaveButton);
window.addEventListener("load", function(){
  if (localStorage.length === 0){
    return
  }
  createNewCard();
});
//searchButton.addEventListener("click", findSavedIdea);
// favoriteButton.addEventListener("click", favoriteIdea);
ideaCardGrid.addEventListener("click", manipulateCard);
searchButton.addEventListener('click', searchBarSearch);
searchInput.addEventListener('keyup', searchBarSearch);
showStarredIdeasButton.addEventListener('click', showStarredIdeas);


function saveIdea(title, body) {
  event.preventDefault(event);
  disableSaveButton();
  var title = titleInput.value;
  var body = bodyInput.value;
  var newIdea = new Idea(title, body);
  allSavedIdeas.push(newIdea);
  newIdea.saveToStorage()
  createNewCard();
  clearInputFields();
}

function createNewCard() {
  retrieveFromStorage();
  ideaCardGrid.innerHTML = "";
  for (var i = 0; i < allSavedIdeas.length; i++) {
    ideaCardGrid.innerHTML += `<section class="idea-card" id="${allSavedIdeas[i].id}">
          <header class="card-top">
            <button class="favorite-button">
              <img src="images/star.svg" alt="Star button icon" class="star-inactive star">
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
            <label class="comment-word">Comment</label>
          </footer>
        </section>`
  }
}

function retrieveFromStorage() {
  allSavedIdeas = JSON.parse(localStorage.getItem("saved-ideas"));
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


function manipulateCard(event) {
  if(event.target.closest('.star-inactive') || event.target.closest('.star-active')) {
    favoriteCard(event);
  } else if(event.target.closest('.delete')) {
    deleteCard(event);
  }
}

function favoriteCard(event) {
  card = event.target.closest('section');
  image = event.target.closest('.star-inactive');
  if (image === null) {
    unfavoriteCard(event)
    return
  }
  for(var i = 0; i < allSavedIdeas.length; i++) {
    if(card.id === `${allSavedIdeas[i].id}`) {
      allFavoriteIdeas.push(`${allSavedIdeas[i]}`);
      image.src = "images/star-active.svg"
    }
    image.classList.remove("star-inactive");
    image.classList.add("star-active");
  }
}

function unfavoriteCard(event) {
  card = event.target.closest('section');
  image = event.target.closest('.star-active');
  for(var i = 0; i < allSavedIdeas.length; i++) {
    if(card.id === `${allSavedIdeas[i].id}`) {
      allFavoriteIdeas.splice(i, 1);
      image.src = "images/star.svg"
    }
    image.classList.add("star-inactive");
    image.classList.remove("star-active");
  }
}

function deleteCard(event) {
  card = event.target.closest('section');
  remove = event.target.closest('.delete');
  for(var i = 0; i < allSavedIdeas.length; i++) {
    if(card.id === `${allSavedIdeas[i].id}`) {
      allSavedIdeas.splice(i, 1);
      retrieveFromStorage();
      allSavedIdeas.splice(i, 1);
      localStorage.setItem("saved-ideas", JSON.stringify(allSavedIdeas));
    }
  }
  card.classList.add('hidden');
}

function searchBarSearch () {
  var typedInput = searchInput.value;
  typedInput = typedInput.toLowerCase();
  var ideaTitles = document.getElementsByClassName('card-title');
  for (i = 0; i < ideaTitles.length; i++) {
    if (!ideaTitles[i].innerHTML.toLowerCase().includes(typedInput)) {
        ideaTitles[i].parentElement.parentElement.style.display = "none";
    }
    else {
        ideaTitles[i].parentElement.parentElement.style.display = "list-item";
    }
  }
}

//only searches through titles, needs to also search through body text
