// initialize library
//const myLibrary = [];

// constructor function to create books
// function Book(title, author, pages, read) {
//   if (!new.target) {
//     throw Error("You must use the 'new' operator to call the constructor");
//   }

//   this.id = crypto.randomUUID();
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   this.info = () => {
//     return `${this.id} ${this.title} by ${this.author}, ${pages} pages, ${
//       read ? "read it" : "not read yet"
//     }`;
//   };
// }

// let theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
// console.log(theHobbit.info());

// function to add book to library
// function addBookToLibrary(title, author, pages, read) {
//   let myBook = new Book(title, author, pages, read);
//   myLibrary.push(myBook);
// }

// add a book to the library for testing
//addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
//book class
class book {
  constructor (title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// library class
class library {
  myLibrary = []

  addBookToLibrary(book) {
    this.myLibrary.push(book);
  }

  removeBook(id) {
    this.myLibrary = this.myLibrary.filter(book => book.id !== id);
  }

  toggleRead(id) {
    const book = this.myLibrary.find(book => book.id === id);
    if (book) book.read = !book.read;
    return book;
  }
}

class Card {
  constructor (book) {
    this.book = book;
  }

  createCard () {
    let newCard = document.createElement('div');
    newCard.id = this.book.id;
    newCard.dataset.id = this.book.id;
    newCard.dataset.read = this.book.read;
    newCard.className = "card w-[300px] h-[300px] border border-black rounded-3xl px-5 py-5 mx-5 my-5 flex flex-col justify-between";

    newCard.innerHTML = `
    <ul class="flex flex-col justify-between h-[100%]">
      <li><span class="font-bold">ID:</span> ${this.book.id}</li>
      <li><span class="font-bold">Title:</span> ${this.book.title}</li>
      <li><span class="font-bold">Author:</span> ${this.book.author}</li>
      <li><span class="font-bold">Pages:</span> ${this.book.pages}</li>
      <li class="read-status"><span class="font-bold">read:</span> ${this.book.read}</li>
    </ul>
    <button class="toggle-read border border-black py-2 px-4 mt-3 rounded-2xl hover:bg-black hover:text-white ${this.book.read ? "hidden" : ""}">Have read the book</button>
    <button class="remove-book border border-black py-2 px-4 mt-3 rounded-2xl hover:bg-black hover:text-white">remove</button>
  `;
    return newCard;
  }
}

// access the booklist view
const myBookList = document.querySelector("#bookList");

// myBookList.innerHTML = bookCards.join(" ");
// initialize a library
const theLibrary = new library();

// access forms and its buttons to show and hide it
const showForm = document.querySelector(".show-form");
const myForm = document.querySelector("form");
const closeForm = document.querySelector(".close-form");

showForm.addEventListener("click", () => {
  myForm.classList.remove("hidden");
});

closeForm.addEventListener("click", () => {
  myForm.classList.add("hidden");
});

// on form submit get data and render new card
myForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(myForm);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = parseInt(formData.get('pages'), 10);
  const read = formData.get('read') === 'yes';
  let isRead = true;
  if (read === 'no') {
    isRead = false;
  }

  // initialize a book
  const newBook = new book(title, author, pages, read);
  //const book = new Book(title, author, pages, read);
  
  // add book to the library
  theLibrary.addBookToLibrary(newBook);
  //myLibrary.push(book);

  // Create the card element manually
  //const newCard = document.createElement('div');
  const newCard = new Card(newBook);
  const newCardElement = newCard.createCard();
  // newCard.id = book.id;
  // newCard.dataset.id = book.id;
  // newCard.dataset.read = book.read;
  // newCard.className = "card w-[300px] h-[300px] border border-black rounded-3xl px-5 py-5 mx-5 my-5 flex flex-col justify-between";

  // newCard.innerHTML = `
  //   <ul class="flex flex-col justify-between h-[100%]">
  //     <li><span class="font-bold">ID:</span> ${book.id}</li>
  //     <li><span class="font-bold">Title:</span> ${book.title}</li>
  //     <li><span class="font-bold">Author:</span> ${book.author}</li>
  //     <li><span class="font-bold">Pages:</span> ${book.pages}</li>
  //     <li class="read-status"><span class="font-bold">read:</span> ${book.read}</li>
  //   </ul>
  //   <button class="toggle-read border border-black py-2 px-4 mt-3 rounded-2xl hover:bg-black hover:text-white ${book.read ? "hidden" : ""}">Have read the book</button>
  //   <button class="remove-book border border-black py-2 px-4 mt-3 rounded-2xl hover:bg-black hover:text-white">remove</button>
  // `;

  // Append the new card
  myBookList.appendChild(newCardElement);

  const toggleRead = newCardElement.querySelector('.toggle-read');
  const read_element = newCardElement.querySelector('.read-status');
  toggleRead.addEventListener('click', () => {
    // const index = myLibrary.findIndex(book => book.id === newCardElement.dataset.id);
    // if (index !== -1) {
    //   // Toggle the boolean value
    //   myLibrary[index].read = !myLibrary[index].read;

    //   // Update the DOM
    //   read_element.innerHTML = `<span class="font-bold">read:</span> ${myLibrary[index].read}`;
    // }
    // toggleRead.classList.add('hidden');
    const updatedBook = theLibrary.toggleRead(newCardElement.dataset.id);
    if (updatedBook) {
      read_element.innerHTML = `<span class="font-bold">read:</span> ${updatedBook.read}`;
      toggleRead.classList.add("hidden");
    }
  });

  // Select the button *inside* this card
  const removeBtn = newCardElement.querySelector('.remove-book');
  removeBtn.addEventListener('click', () => {
    // const id = newCardElement.dataset.id;
    // const index = myLibrary.findIndex(book => book.id === id);
    // if (index !== -1) {
    //   myLibrary.splice(index, 1);
    // }
    // newCardElement.remove();
    const id = newCardElement.dataset.id;
    theLibrary.removeBook(id);
    newCardElement.remove();
  });

  myForm.reset();
  myForm.classList.add('hidden');
});