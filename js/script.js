const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const tbody = document.querySelector('tbody');
  tbody.replaceChildren();

  myLibrary.forEach(book => {
    const row = tbody.insertRow(-1);
    for (key in book) {
      row.insertCell().textContent = book[key];
    }
  });
}