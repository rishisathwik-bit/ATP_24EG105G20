/* Problem Statement: Library Book Management System
-------------------------------------------------
Objective : Create a Book class and use it to manage a collection of books in a library.

Requirements:
  Create a Book class with the following:

  Properties:
      title (string)
      author (string)
      pages (number)
      isAvailable (boolean, default: true)

  Methods:
      borrow() - Marks the book as not available
      returnBook() - Marks the book as available
      getInfo() - Returns a string with book details (e.g., "The Hobbit by J.R.R. Tolkien (310 pages)")
      isLongBook() - Returns true if pages > 300, false otherwise

 1. Create at least 5 book objects using the class:
      Example: "Harry Potter", "1984", "The Hobbit", etc.

  2. Perform the following operations:

      i. Display info of all books
      ii. Borrow 2 books and show their availability status
      iii. Return 1 book and show updated status
      iv. Count how many books are "long books" (more than 300 pages)
      v. List all available books  */


      class Book {
    constructor(title, author, pages, isAvailable = true) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isAvailable = isAvailable;
    }

    borrow() {
        this.isAvailable = false;
        console.log(`${this.title} is borrowed`);
    }

    returnBook() {
        this.isAvailable = true;
        console.log(`${this.title} is returned`);
    }

    getInfo() {
        return `${this.title} by ${this.author} (${this.pages} pages)`;
    }

    isLongBook() {
        return this.pages > 300;
    }
}

// Creating 5 books
const b1 = new Book(" Programming in Java", "James Gosling", 350);
const b2 = new Book("Programming in c","Dennis Ritchie" ,250);
const b3 = new Book("Applied Physics", "J.R.R. Tolkien", 310);
const b4 = new Book("Networks", "James Clear", 320);
const b5 = new Book("Technologys", "Paulo Coelho", 200);

const books = [b1, b2, b3, b4, b5];


// i. Display info of all books
console.log("All Books:");
books.forEach(book => console.log(book.getInfo()));


// ii. Borrow 2 books
b1.borrow();
b3.borrow();

console.log("Availability:");
console.log(b1.title, b1.isAvailable);
console.log(b3.title, b3.isAvailable);


// iii. Return 1 book
b1.returnBook();
console.log(b1.title, b1.isAvailable);


// iv. Count long books
let longBookCount = books.filter(book => book.isLongBook()).length;
console.log("Long Books Count:", longBookCount);


// v. List available books
console.log("Available Books:");
books
  .filter(book => book.isAvailable)
  .forEach(book => console.log(book.title));