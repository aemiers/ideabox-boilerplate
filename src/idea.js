class Idea {
  constructor(title, body, star) {
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.star = false;
  }

  saveToStorage() {
    localStorage.setItem("saved-ideas", JSON.stringify(allSavedIdeas));
  }

  deleteFromStorage() {
    var savedIdeas = JSON.parse(localStorage.getItem("saved-ideas"));
    for (var i = 0; i < savedIdeas.length; i++){
      if (savedIdeas[i].id === this.id) {
        savedIdeas.splice(i, 1);
        console.log('bloop')
      }
    }
    localStorage.setItem("saved-ideas", JSON.stringify(savedIdeas))
  }

  updateIdea() {
    this.star = !this.star;
    this.star ? this.src = "images/star-active.svg" : this.src = "images/star.svg"
  }
}
