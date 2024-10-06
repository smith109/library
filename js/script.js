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

Book.prototype.changeReadStatus = function () {
  this.read = this.read === 'Unread' ? 'Read' : 'Unread';
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

    for (const key in book) {
      if (Object.hasOwn(book, key)) {
        row.insertCell().textContent = book[key];
      }
    }

    const actionButtons = row.insertCell();
    const statusBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    statusBtn.textContent = updateButtonText(book);
    deleteBtn.textContent = 'Delete';
    actionButtons.append(statusBtn, deleteBtn);
  });
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  displayBooks();
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

function updateButtonText(book) {
  return book.read === 'Unread' ? 'Mark as Read' : 'Mark as Unread';
}