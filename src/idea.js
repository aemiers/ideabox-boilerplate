class Idea {
  constructor(title, body, id) {
  this.id = id || Date.now();
  this.title = title;
  this.body = body;
  this.star = false;
  }

  saveToStorage() {
    localStorage.setItem("saved-ideas", JSON.stringify(allSavedIdeas));
  }
}
