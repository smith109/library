const newBookBtn = document.querySelector('.new-book');
const closeBtn = document.querySelector('.close-btn');
const dialog = document.querySelector('dialog');
const bookForm = document.querySelector('form');
const myLibrary = [];

newBookBtn.addEventListener('click', () => dialog.showModal());
closeBtn.addEventListener('click', () => dialog.close());
bookForm.addEventListener('submit', submitBookForm);

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

function submitBookForm(e) {
  const title = document.querySelector('#book_title').value;
  const author = document.querySelector('#book_author').value;
  const pages = document.querySelector('#book_pages').value;
  const read = document.querySelector('input[name="status"]:checked').value;
  const book = new Book(title, author, pages, read);

  addBookToLibrary(book);
  e.preventDefault();
  bookForm.reset();
  dialog.close();
}