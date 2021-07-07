class Book {
  constructor(number, title, author) {
    this.number = number;
    this.title = title;
    this.author = author;
  }
}
let count = 0;
class BookStored {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = BookStored.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(number) {
    const books = BookStored.getBooks();
    books.forEach((book, index) => {
      if (book.number === Number(number)) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class BookList {
  static display() {
    const books = BookStored.getBooks();
    books.forEach((book) => {
      book.number = count;
      BookList.addBookToList(book);
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static addBookToList(book) {
    const list = document.getElementById('book-list');
    list.insertAdjacentHTML('afterbegin',
      `<div class="${count}">
            <p>${book.title}</p>
            <p>${book.author}</p>
            <button class='remove-btn' type="button">Remove</button>
            <hr>
            </div>`);
    count += 1;
  }

  static deleteBook(element) {
    if (element.classList.contains('remove-btn')) {
      element.parentNode.remove();
    }
  }

  static clear() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', BookList.display);

const form = document.getElementById('add-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const book = new Book(count, title, author);
  BookList.addBookToList(book);
  BookStored.addBook(book);
  BookList.clear();
});

const list = document.getElementById('book-list');
list.addEventListener('click', (e) => {
  BookList.deleteBook(e.target);
  BookStored.removeBook(e.target.parentNode.classList.value);
});