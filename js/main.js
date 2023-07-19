window.onload = loadBooks

document.querySelector('button').addEventListener('click',function() {
  getFetch();
});

function getFetch(){
  let choice = document.querySelector('input').value;
  // 9780385540735 --> Surfing with Sartre
  // 9780345391803 --> Hitchhiker's Guide to the Galaxy
  // 0553213997 --> The Odyssey of Homer
  const url = `https://openlibrary.org/isbn/${choice}.json`;

  if (choice) {
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        //console.log(data.title);
        let book = data.title;
        let books = JSON.parse(localStorage.getItem('books'));
        const booksList = document.querySelector('ul');
        // check to see if localStorage has any books in it
        if (books) {
          // check to see if the book is already in local storage
          if (books.includes(book)) {
            alert('You already added this book to your list.')
          } else {
            // add the book to localStorage
            localStorage.setItem('books', JSON.stringify([...JSON.parse(localStorage.getItem('books') || '[]'), book]));
          }
        } else {
          // add the book to localStorage
          localStorage.setItem('books', JSON.stringify([...JSON.parse(localStorage.getItem('books') || '[]'), book]));
          // add the book to the booksList
          const li = document.createElement('li');
          li.textContent = book;
          booksList.appendChild(li);
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

// fetch book by ISBN
//push it to books array
//add books array to localstorage
//render books array from localstorage