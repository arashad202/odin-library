// initialize library
const myLibrary = [];

// constructor function to create books
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${this.id} ${this.title} by ${this.author}, ${pages} pages, ${
      read ? "read it" : "not read yet"
    }`;
  };
}

// let theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
// console.log(theHobbit.info());

// function to add book to library
function addBookToLibrary(title, author, pages, read) {
  let myBook = new Book(title, author, pages, read);
  myLibrary.push(myBook);
}

// add a book to the library for testing
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);

// access the booklist view
const myBookList = document.querySelector("#bookList");

// for everybook in view return a card for the book and store all cards in an array and append the new card to the booklistview
const bookCards = myLibrary.map((book) => {
  return `
     <div class="w-[300px] h-[300px] border border-black rounded-3xl px-5 py-5 mx-5 my-5">
        <ul>
          <li><span class="font-bold">ID:</span> ${book.id}</li>
          <li><span class="font-bold">Title:</span> ${book.title}</li>
          <li><span class="font-bold">Author:</span> ${book.author}</li>
          <li><span class="font-bold">Pages:</span> ${book.pages}</li>
          <li><span class="font-bold">read:</span> ${book.read}</li>
        </ul>
      </div>`;
});

myBookList.innerHTML = bookCards.join(" ");




// access forms and its buttons to show and hide it
const showForm = document.querySelector(".show-form");
const myForm = document.querySelector("form");
const closeForm = document.querySelector('.close-form');

showForm.addEventListener('click', () => {
  myForm.classList.remove('hidden');
});

closeForm.addEventListener('click', () => {
  myForm.classList.add('hidden');
});

// on form submit get data and render new card
myForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const formData = new FormData(myForm);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = parseInt(formData.get('pages'), 10);
  const read = formData.get('read') === 'yes';
  
  const book = new Book(title, author, pages, read);  // create book once
  myLibrary.push(book);  // store it

  const newCard = `
    <div class="w-[300px] h-[300px] border border-black rounded-3xl px-5 py-5 mx-5 my-5">
      <ul>
        <li><span class="font-bold">ID:</span> ${book.id}</li>
        <li><span class="font-bold">Title:</span> ${book.title}</li>
        <li><span class="font-bold">Author:</span> ${book.author}</li>
        <li><span class="font-bold">Pages:</span> ${book.pages}</li>
        <li><span class="font-bold">read:</span> ${book.read}</li>
      </ul>
    </div>`;
  
  myBookList.insertAdjacentHTML('beforeend', newCard);

  myForm.reset();
  myForm.classList.add('hidden');
});





