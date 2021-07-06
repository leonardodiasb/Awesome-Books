const title = document.getElementById('title');
const author = document.getElementById('author');
const form = document.getElementById('add-form');
const list = document.getElementById('book-list');
const bookStored = JSON.parse(localStorage.getItem('books'));
let bookList = bookStored;
if (!bookList) {
  bookList = [];
}
let count = Number(localStorage.getItem('count'));

window.addEventListener('load', () => {
  if (bookStored) {
    for (let j = 0; j < bookStored.length; j += 1) {
      list.insertAdjacentHTML('afterbegin',
        `<div class="${bookStored[j].number}"">
    <p>${bookStored[j].title}</p>
    <p>${bookStored[j].author}</p>
    <button class='remove-btn' type="button" onClick="Remove(this)">Remove</button>
    <hr>
  </div>`);
    }
  }
});

function Add(e) {
  list.insertAdjacentHTML('afterbegin',
    `<div class="${count}"">
    <p>${title.value}</p>
    <p>${author.value}</p>
    <button class='remove-btn' type="button" onClick="Remove(this)">Remove</button>
    <hr>
  </div>`);
  const book = { number: count, title: title.value, author: author.value };
  bookList.push(book);
  localStorage.setItem('count', JSON.stringify(count));
  localStorage.setItem('books', JSON.stringify(bookList));
  count += 1;
  e.preventDefault();
}

function Remove(e) { // eslint-disable-line no-unused-vars
  const bookNumber = e.parentNode.classList.value;
  for (let i = 0; i < bookList.length; i += 1) {
    if (bookList[i].number === bookNumber) {
      bookList.splice(i, 1);
      localStorage.setItem('books', JSON.stringify(bookList));
    }
  }
  e.parentNode.remove();
}

form.addEventListener('submit', Add);