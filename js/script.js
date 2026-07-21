const newBookBtn = document.querySelector('.new-book-btn');
const closeModalBtn = document.querySelector('.close-modal');
const newBookForm = document.querySelector('.new-book-form');
const newBookModal = document.querySelector('.new-book-modal');
const bookCards = document.querySelector('.book-cards');
const myLibrary = [];

newBookBtn.addEventListener('click', () => newBookModal.showModal());
closeModalBtn.addEventListener('click', closeNewBookModal);
newBookForm.addEventListener('submit', submitNewBookForm);
bookCards.addEventListener('click', handleBookActions);

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error('You must use the "new" operator to call the constructor');
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  const bookCards = document.querySelector('.book-cards');
  bookCards.replaceChildren();

  myLibrary.forEach((book) => {
    const cardElement = document.createElement('div');
    const bookTitleElement = document.createElement('h2');
    const bookAuthorElement = document.createElement('p');
    const bookPagesElement = document.createElement('p');
    const bookReadElement = document.createElement('p');
    const btnContainer = document.createElement('div'); 
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    cardElement.dataset.id = book.id;
    cardElement.classList.add('card');
    btnContainer.classList.add('btn-container');
    readBtn.classList.add('read-btn');
    removeBtn.classList.add('remove-btn');

    bookTitleElement.textContent = book.title;
    bookAuthorElement.textContent = `By: ${book.author}`;
    bookPagesElement.textContent = `${book.pages} pages`;
    bookReadElement.textContent = book.read ? 'Read' : 'Not read yet';
    readBtn.textContent = 'Toggle Read';
    removeBtn.textContent = 'Remove';

    btnContainer.append(readBtn, removeBtn);

    cardElement.append(
      bookTitleElement, 
      bookAuthorElement, 
      bookPagesElement, 
      bookReadElement,
      btnContainer,
    );

    bookCards.appendChild(cardElement);
  });
}

function closeNewBookModal() {
  newBookForm.reset();
  newBookModal.close();
}

function submitNewBookForm() {
  const inputs = newBookForm.elements;
  const title = inputs['book-title'].value;
  const author = inputs['book-author'].value;
  const pages = inputs['page-count'].value;
  const read = inputs['read-status'].checked;
 
  addBookToLibrary(title, author, pages, read);
  newBookForm.reset();
  displayBooks();
}

function handleBookActions(event) {
  if (event.target.tagName != 'BUTTON') return;

  const target = event.target;
  const closestCard = target.closest('.card');
  const bookId = closestCard.dataset.id;

  if (target.className === 'remove-btn') {
    removeBookFromLibrary(bookId);
    displayBooks();
  }

  if (target.className === 'read-btn') {
    updateReadStatus(bookId);
    displayBooks();
  }
}

function removeBookFromLibrary(bookId) {
  const index = myLibrary.findIndex((book) => book.id === bookId);
  myLibrary.splice(index, 1);
}

function updateReadStatus(bookId) {
  const index = myLibrary.findIndex((book) => book.id === bookId);
  myLibrary[index].toggleRead();
}

// Sample Books:
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Fahrenheit 451', 'Ray Bradbury', 156, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
displayBooks();
