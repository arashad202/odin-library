// initialize library
const myLibrary = [];

// constructor function to create books
function Book (title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return `${this.id} ${this.title} by ${this.author}, ${pages} pages, ${read ? "read it" : "not read yet"}`
    }
}

// let theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
// console.log(theHobbit.info());

// function to add book to library
function addBookToLibrary (title, author, pages, read) {
    let myBook = new Book(title, author, pages, read);
    myLibrary.push(myBook);
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);

// access the booklist view
const myBookList = document.querySelector('#bookList');

// for everybook in view return a card for the book and store all cards in an array and append the new card to the booklistview
const bookCards = myLibrary.map(book => {
    const myCard = `<div class="w-[300px] h-[300px] border border-black rounded-3xl px-5 py-5">
        <ul>
          <li>ID: ${book.id}</li>
          <li>Title: ${book.title}</li>
          <li>Author: ${book.author}</li>
          <li>Pages: ${book.pages}</li>
          <li>read: ${book.read}</li>
        </ul>
      </div>`;
    return myCard;
});

myBookList.innerHTML = bookCards.join(" ");
