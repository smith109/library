const myLibrary = [];

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
