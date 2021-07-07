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
    list.insertAdjacentHTML('beforeend',
      `<div class="${count}">
            <div class="book-content">
              <p>"${book.title}"</p>
              <p>&nbspby&nbsp </p>
              <p>${book.author}</p>
            </div>
            <button class='remove-btn' type="button">Remove</button>
        </div>`);
    count += 1;
  }

  static deleteBook(element) {
    element.parentNode.remove();
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
  if (e.target.classList.contains('remove-btn')) {
    BookList.deleteBook(e.target);
    BookStored.removeBook(e.target.parentNode.classList.value);
  }
});

const listPage = document.getElementById('list-link');
const addPage = document.getElementById('add-link');
const contactPage = document.getElementById('contact-link');
const allBookSection = document.getElementById('all-books');
const contactSection = document.getElementById('contact-section');

listPage.addEventListener('click', () => {
  allBookSection.style.display = 'flex';
  form.style.display = 'none';
  contactSection.style.display = 'none';
  listPage.style.color = 'blue';
  addPage.style.color = 'black';
  contactPage.style.color = 'black';
});

addPage.addEventListener('click', () => {
  allBookSection.style.display = 'none';
  form.style.display = 'flex';
  contactSection.style.display = 'none';
  listPage.style.color = 'black';
  addPage.style.color = 'blue';
  contactPage.style.color = 'black';
});

contactPage.addEventListener('click', () => {
  allBookSection.style.display = 'none';
  form.style.display = 'none';
  contactSection.style.display = 'flex';
  listPage.style.color = 'black';
  addPage.style.color = 'black';
  contactPage.style.color = 'blue';
});

const dt = new Date();
document.getElementById('datetime').innerHTML = `${(`0${dt.getDate()}`).slice(-2)}.${(`0${dt.getMonth() + 1}`).slice(-2)}.${dt.getFullYear()} ${(`0${dt.getHours()}`).slice(-2)}:${(`0${dt.getMinutes()}`).slice(-2)}`;