document.querySelector('button').addEventListener('click', getFetch);

document.querySelector('h2').innerText = localStorage.getItem('books');

function getFetch(){
  const choice = document.querySelector('input').value
  // 9780385540735 --> Surfing with Sartre
  // 9780345391803 --> Hitchhiker's Guide to the Galaxy
  const url = `https://openlibrary.org/isbn/${choice}.json`

  if (choice) {
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.title);
        // if localStorage is empty, add first book into local storage
        if (!localStorage.getItem('books')) {
          localStorage.setItem('books', data.title);
        } else {
          let books = localStorage.getItem('books') + ';' + data.title;
          localStorage.setItem('books', books);
        }
        //place books in DOM
        document.querySelector('h2').innerText = localStorage.getItem('books');
      })
      .catch(err => {
          console.log(`error ${err}`);
      });
  }
}