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
window.addEventListener("load", function() {
  if (localStorage.length === 0) {
    return
  }
  createNewCard();
});

ideaCardGrid.addEventListener("click", manipulateCard);
searchButton.addEventListener('click', searchBarSearch);
searchInput.addEventListener('keyup', searchBarSearch);
showStarredIdeasButton.addEventListener('click', showStarredIdeas);

function saveIdea() {
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
    var starImage = allSavedIdeas[i].star ? this.src = "images/star-active.svg" : this.src = "images/star.svg"
    var starClass = allSavedIdeas[i].star ? "star-active" : "star-inactive";
    ideaCardGrid.innerHTML += `
        <section class="idea-card" id="${allSavedIdeas[i].id}">
          <header class="card-top">
            <button class="favorite-button">
              <img src="${starImage}" alt="Star button icon" class="star ${starClass}">
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

function sendToStorage() {
  localStorage.setItem("saved-ideas", JSON.stringify(allSavedIdeas));

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
  if (event.target.closest('.star')) {
    favoriteCard(event);
  } else if (event.target.closest('.delete')) {
    deleteCard(event);
  }
}

function favoriteCard(event) {
  var card = event.target.closest('section');
  var image = event.target.closest('.star');
  if (image === null || event.target.classList.contains('star-active')) {
    unfavoriteCard(event)
    return
  }
  for (var i = 0; i < allSavedIdeas.length; i++) {
    if (card.id === `${allSavedIdeas[i].id}`) {
      allFavoriteIdeas.push(`${allSavedIdeas[i]}`);
      image.src = "images/star-active.svg"
    }
    updateStar(card);
    image.classList.remove("star-inactive");
    image.classList.add("star-active");
  }
}

function unfavoriteCard(event) {
  var card = event.target.closest('section');
  var image = event.target.closest('.star');
  retrieveFromStorage();
  for (var i = 0; i < allSavedIdeas.length; i++) {
    if (card.id === `${allSavedIdeas[i].id}`) {
      allFavoriteIdeas.splice(i, 1);
      image.src = "images/star.svg"
    }
  }
  updateStar(card);
  image.classList.remove("star-active");
  image.classList.add("star-inactive");
}

function updateStar(card) {
  for (var i = 0; i < allSavedIdeas.length; i++) {
    if (card.id === `${allSavedIdeas[i].id}`) {
      allSavedIdeas[i].star = !allSavedIdeas[i].star;
    }
    sendToStorage();
  }
}

function deleteCard(event) {
  var card = event.target.closest('section');
  var remove = event.target.closest('.delete');
  for (var i = 0; i < allSavedIdeas.length; i++) {
    if (card.id === `${allSavedIdeas[i].id}`) {
      allSavedIdeas.splice(i, 1);
      retrieveFromStorage();
      sendToStorage();
    }
  }
  card.classList.add('hidden');
}

function searchBarSearch () {
  var typedInput = searchInput.value;
  typedInput = typedInput.toLowerCase();
  var ideaCardText = document.getElementsByClassName('idea-card');
  for (i = 0; i < ideaCardText.length; i++) {
    if (!ideaCardText[i].innerHTML.toLowerCase().includes(typedInput)) {
        ideaCardText[i].style.display = "none";
    }
    else {
        ideaCardText[i].style.display = "list-item";
    }
  }
}

function showStarredIdeas() {
  changeStarredIdeasButtonText();
  retrieveFromStorage();
  filterIdeas();
}

function filterIdeas() {
  var allCards = document.querySelectorAll('.idea-card');
  for (var i = 0; i < allCards.length; i++) {
    if (!allSavedIdeas[i].star) {
      allCards[i].classList.toggle('hidden');
    }
  }
}

function changeStarredIdeasButtonText() {
  if (showStarredIdeasButton.innerHTML === 'Show Starred Ideas') {
    showStarredIdeasButton.innerHTML = 'Show All Ideas';
  } else {
    showStarredIdeasButton.innerHTML = 'Show Starred Ideas';
  }
}
