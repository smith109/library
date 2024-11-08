const newBookBtn = document.querySelector('.new-book');
const closeBtn = document.querySelector('.close-btn');
const dialog = document.querySelector('dialog');
const bookForm = document.querySelector('form');
const tbody = document.querySelector('tbody');
const myLibrary = [];

newBookBtn.addEventListener('click', () => dialog.showModal());
closeBtn.addEventListener('click', () => dialog.close());
bookForm.addEventListener('submit', submitBookForm);
tbody.addEventListener('click', handleActionButtons);

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeReadStatus() {
    this.read = this.read === 'Unread' ? 'Read' : 'Unread';
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  tbody.replaceChildren();
  myLibrary.forEach((book, index) => {
    const row = tbody.insertRow(-1);
    row.dataset.id = index;

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

function handleActionButtons(e) {
  const target = e.target;
  const row = target.closest('[data-id]');
  const index = row.dataset.id;

  if (target.tagName !== 'BUTTON') return;

  if (target.textContent === 'Delete') {
    removeBookFromLibrary(index);
  }

  if (target.textContent === 'Mark as Read' ||
    target.textContent === 'Mark as Unread') {
    myLibrary[index].changeReadStatus();
  }

  displayBooks();
}

function updateButtonText(book) {
  return book.read === 'Unread' ? 'Mark as Read' : 'Mark as Unread';
}

// Sample Books
let book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '208', 'Read');
let book2 = new Book('To Kill a Mockingbird', 'Harper Lee', '336', 'Unread');
let book3 = new Book('The Shining', 'Stephen King', '688', 'Unread');
let book4 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Read');
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);