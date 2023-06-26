let books = [];
let booksFromLocalStorage = JSON.parse(localStorage.getItem('books'));

if (booksFromLocalStorage) {
  books = booksFromLocalStorage;
  renderBooks(books);
}

document.querySelector('button').addEventListener('click',function() {
  getFetch();
  console.log(books);
  renderBooks(books);
});

//document.querySelector('h2').innerText = localStorage.getItem('books');
//renderBooks(JSON.parse(localStorage.getItem('books')));


function getFetch(){
  const choice = document.querySelector('input').value;
  // 9780385540735 --> Surfing with Sartre
  // 9780345391803 --> Hitchhiker's Guide to the Galaxy
  // 0553213997 --> The Odyssey of Homer
  const url = `https://openlibrary.org/isbn/${choice}.json`;
  

  if (choice) {
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        //console.log(data.title);
        books.push(data.title);
        console.log(books);
        localStorage.setItem('books', JSON.stringify(books));
      })
      .catch(err => {
          console.log(`error ${err}`);
      });
  }

}

function renderBooks(arr) {
  arr.forEach(element => {
    const li = document.createElement('li');
    li.textContent = element;
    document.querySelector('ul').appendChild(li);
    console.log(element);
  });
}

// fetch book by ISBN
//push it to books array
//add books array to localstorage
//render books array from localstorage