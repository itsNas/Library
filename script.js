// UI elements
const addBookBtn = document.getElementById("addBookBtn");
const addBookModal = document.getElementById("addBookModal");
const overlay = document.getElementById("overlay");
const addBookForm = document.getElementById("addBookForm");
const booksGrid = document.getElementById("booksGrid");

// setup modal popup
const openModal = () => {
    addBookModal.classList.add("active");
    overlay.classList.add("active");
};

const closeModal = () => {
    addBookModal.classList.remove("active");
    overlay.classList.remove("active");
    addBookForm.reset();
};

// Library class and Book class
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook);
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title);
    }

    getBook(title) {
        return this.books.find((book) => book.title === title);
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title);
    }
}

const library = new Library();

// function to run the library after submitting
const addBook = (e) => {
    e.preventDefault();
    const newBook = getInput();

    if (library.isInLibrary(newBook)) {
        alert("The book is already in the library");
        return;
    }

    library.addBook(newBook);
    saveLocal();
    updateBooksGrid();
    closeModal();
};

// function to get the book's input values
const getInput = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;
    return new Book(title, author, pages, isRead);
};

// function to render the book cards grid
const updateBooksGrid = () => {
    resetBooksGrid();
    for (let book of library.books) {
        createBookCard(book);
    }
};

const resetBooksGrid = () => {
    booksGrid.innerText = "";
};

// function to create Book Card
const createBookCard = (book) => {
    const bookCard = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const buttonGroup = document.createElement("div");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    bookCard.classList.add("book-card");
    buttonGroup.classList.add("button-group");
    readBtn.classList.add("btn");
    removeBtn.classList.add("btn");
    readBtn.onclick = toggleRead;
    removeBtn.onclick = removeBook;

    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    removeBtn.textContent = "Remove";

    if (book.isRead) {
        readBtn.textContent = "Read";
        readBtn.style.backgroundColor = "green";
    } else {
        readBtn.textContent = "Not read";
        readBtn.style.backgroundColor = "blue";
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    buttonGroup.appendChild(readBtn);
    buttonGroup.appendChild(removeBtn);
    bookCard.appendChild(buttonGroup);
    booksGrid.appendChild(bookCard);
};

// function to remove a book
const removeBook = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ""
    );

    library.removeBook(title);
    saveLocal();
    updateBooksGrid();
};

// toggle read button
const toggleRead = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ""
    );
    const book = library.getBook(title);
    book.isRead = !book.isRead;

    saveLocal();
    updateBooksGrid();
};

// function to locally save the book
const saveLocal = () => {
    localStorage.setItem("library", JSON.stringify(library.books));
};

const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem("library"));
    if (books) {
        library.books = books.map((book) => JSONToBook(book));
    } else {
        library.books = [];
    }
};

const JSONToBook = (book) => {
    return new Book(book.title, book.author, book.pages, book.isRead);
};

//  refresh the web page with the stored data
const restore = () => {
    restoreLocal();
    updateBooksGrid();
};

restore();

addBookBtn.onclick = openModal;
overlay.onclick = closeModal;
addBookForm.onsubmit = addBook;