window.onload = loadBooks;

class Book {
  constructor(title, isbn, isSeries) {
    this._title = title;
    this._isbn = isbn;
    this.isSeries = isSeries;
    this.dateAdded = this.getDate();
  }

  getDate () {
    return new Date().toLocaleDateString('en-us')
  }
}

document.querySelector('button').addEventListener('click',function() {
  getFetch();
});

function getFetch(){
  let choice = document.querySelector('input').value;
  // 9780385540735 --> Surfing with Sartre
  // 9780345391803 --> Hitchhiker's Guide to the Galaxy
  // 0553213997 --> The Odyssey of Homer
  // 9780553381696 --> Clash of Kings
  const url = `https://openlibrary.org/isbn/${choice}.json`;

  if (choice) {
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        //console.log(data.title);
        //create book object
        if (Object.keys(data).includes('series')) {
          let book = new Book(data.title, data.isbn_13, true);
          saveBook(book);
        } else {
          let book = new Book(data.title, data.isbn_13, false);
          saveBook(book);
        }

        const booksList = document.querySelector('#booksList');
      })
      .catch(err => {
          console.log(`error ${err}`);
      });
  }

  else {alert('Error: Please enter a valid ISBN number')}
}

 function loadBooks() {
    let books = Array.from(JSON.parse(localStorage.getItem('books')));
    const booksList = document.querySelector('ul');
    
    books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = book;
    booksList.appendChild(li);
  });
}

function saveBook(book) {
  let books = JSON.parse(localStorage.getItem('books'));
  if (books) {
    // check to see if the book is already in local storage --> search by ISBN and compare to each book in books
    books.forEach( elem => {
      if (elem._isbn[0] === book._isbn[0]) {
        alert('You already added this book to your list.');
      } else {
        // add the book to localStorage
        localStorage.setItem('books', JSON.stringify([...JSON.parse(localStorage.getItem('books') || '[]'), book]));
      }
    })
  } else {
    // add the book to localStorage
    localStorage.setItem('books', JSON.stringify([...JSON.parse(localStorage.getItem('books') || '[]'), book]));
  }
}


function getBookList(title, isbn, isSeries, dateAdded) {
  let bookList = ``;
  // args will be matching data from fetched JSON object
  bookList += `
  <div class="book">
    <div class="book-inner">
      <div class="title-div box1">
        <p class="title">${title}</p>
      </div>
      <div class="isbn-div box2">
        <p class="isbn">${isbn}</p>
      </div>
      <div class="series-div box3">
        <p class="series">${isSeries}</p>
      </div>
      <div class="date-div box4">
        <p class="date-added">${dateAdded}</p>
      </div>
    </div>
  </div>
  `
}

function render() {
  document.querySelector('#booksList').innerHTML = getBookList();
}

// fetch book by ISBN
//push it to books array
//add books array to localstorage
//render books array from localstorage