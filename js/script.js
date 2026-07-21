const newBookBtn = document.querySelector('.new-book-btn');
const closeModalBtn = document.querySelector('.close-modal');
const newBookForm = document.querySelector('.new-book-form');
const newBookModal = document.querySelector('.new-book-modal');
const myLibrary = [];

newBookBtn.addEventListener('click', () => newBookModal.showModal());
closeModalBtn.addEventListener('click', closeNewBookModal);
newBookForm.addEventListener('submit', submitNewBookForm);

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

    bookTitleElement.textContent = book.title;
    bookAuthorElement.textContent = `By: ${book.author}`;
    bookPagesElement.textContent = `${book.pages} pages`;
    bookReadElement.textContent = book.read ? 'Read' : 'Not read yet';

    cardElement.append(
      bookTitleElement, 
      bookAuthorElement, 
      bookPagesElement, 
      bookReadElement
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
