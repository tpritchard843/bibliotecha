window.onload = loadBooks;

class Book {
  constructor(title, author, subjects, description) {
    this.title = title;
    this.author = author;
    this.subjects = subjects;
    this.description = description;
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
        let book = new Book(data.title, data.authors, data.subjects, data.description.value);
        console.log(book);

        let books = JSON.parse(localStorage.getItem('books'));
        const booksList = document.querySelector('#booksList');
        // check to see if localStorage has any books in it
        if (books) {
          // check to see if the book is already in local storage
          if (books.includes(book)) {
            alert('You already added this book to your list.')
          } else {
            //push object to books array/localstorage
            //add the book to the booklist
            // add the book to localStorage
            localStorage.setItem('books', JSON.stringify([...JSON.parse(localStorage.getItem('books') || '[]'), book]));
          }
        } else {
          // add the book to the booksList

          // add the book to localStorage
          localStorage.setItem('books', JSON.stringify([...JSON.parse(localStorage.getItem('books') || '[]'), book]));
        }
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

function getBookList(title, author, subjects, description) {
  let bookList = ``;
  // args will be matching data from fetched JSON object
}

function render() {
  document.querySelector('#booksList').innerHTML = getBookList();
}

// fetch book by ISBN
//push it to books array
//add books array to localstorage
//render books array from localstorage