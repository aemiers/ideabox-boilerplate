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
window.addEventListener("load", function(){
  if (localStorage.length === 0){
    return
  }
  createNewCard();
});
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

  localStorage.setItem("saved-ideas", JSON.stringify(allSavedIdeas));

  createNewCard();

  clearInputFields();
}

function createNewCard() {
  allSavedIdeas = JSON.parse(localStorage.getItem("saved-ideas"));
  ideaCardGrid.innerHTML = "";
  for (var i = 0; i < allSavedIdeas.length; i++) {
    console.log(allSavedIdeas[i])
    ideaCardGrid.innerHTML += `<section class="idea-card" id="${allSavedIdeas[i].id}">
          <header class="card-top">
            <button class="favorite-button" >
              <img src="images/star.svg" alt="Star button icon" class="star-inactive">
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
  // debugger
  card = event.target.closest('section');
  image = card.querySelector('.star-inactive');
  if (image === null) {
    unfavoriteCard(event)
    return
  }
  console.log(card.id);
  for(var i = 0; i < allSavedIdeas.length; i++) {
    if(card.id === `${allSavedIdeas[i].id}`) {
      allFavoriteIdeas.push(`${allSavedIdeas[i]}`);
      console.log(allFavoriteIdeas);
      image.src = "images/star-active.svg"
    }
    image.classList.remove("star-inactive");
    image.classList.add("star-active");
  }
}

function unfavoriteCard(event) {
  card = event.target.closest('section');
  image = card.querySelector('.star-active');
  console.log(card.id);
  for(var i = 0; i < allSavedIdeas.length; i++) {
    if(card.id === `${allSavedIdeas[i].id}`) {
      allFavoriteIdeas.splice(i, 1);
      console.log(allFavoriteIdeas);
      image.src = "images/star.svg"
    }
    image.classList.add("star-inactive");
    image.classList.remove("star-active");
  }
}
//add !== for not the same favorite card



//function with conditional that decides if we're favoriting or unfavoriting calls specific one


// ideaCardGrid.addEventListener("click", deleteIdea);

//need to set delete button to the id of the class

// function deleteIdea(event) {
//     if (event.target.classList.contains('delete-button')) {
//     event.target.parentElement.parentElement.remove();
//    }
//   removeHtml(event);
//   // removeLocalStorage();
// }
//
// function removeHtml(event) {
//   for (var i = 0; i < allSavedIdeas.length; i++) {
//     debugger;
//     if(event.target.parentElement.parentElement.parentElement.id === `${allSavedIdeas[i].id}`) {
//       allSavedIdeas.splice(i, 1);
//     }
//   }
// };
//might want to bind when we create the card to the unique id

// removeLocalStorage() {
//
// }
