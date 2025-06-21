const myLibrary = [];


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

function addBookToLibrary (title, author, pages, read) {
    let myBook = new Book(title, author, pages, read);
    myLibrary.push(myBook);
}

// addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
// console.log(myLibrary);

