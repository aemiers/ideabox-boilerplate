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
  //
  //deleteFromStorage() {
  //
  //
  // }
  //
  updateIdea() {
    this.star = !this.star;
  }

}
