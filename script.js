// UI elements
const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const overlay = document.getElementById('overlay');
const addBookForm = document.getElementById('addBookForm');
const booksGrid = document.getElementById('booksGrid');

// setup modal popup
const openModal = () => {
    addBookModal.classList.add('active');
    overlay.classList.add('active');
};

const closeModal = () => {
    addBookModal.classList.remove('active');
    overlay.classList.remove('active');
};

// Book class
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    };
}

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook)
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    getBook(title) {
        return this.books.find((book) => book.title === title)
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }
}

const library = new Library();

const addBook = (e) => {
    e.preventDefault()
    const newBook = getInput()

    library.addBook(newBook)
    saveLocal()
    updateBooksGrid()

    // if (library.isInLibrary(newBook)) {
    //     errorMsg.textContent = 'This book already exists in your library'
    //     errorMsg.classList.add('active')
    //     return
    // }

}

const getInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').ariaChecked
    return new Book(title, author, pages, isRead)
}

const updateBooksGrid = () => {
    resetBooksGrid()
    for (let book of library.books) {
        createBookCard(book)
    }
}

const resetBooksGrid = () => {
    booksGrid.innerText = ''
}

const createBookCard = (book) => {}

const saveLocal = () => {}


addBookBtn.onclick = openModal;
overlay.onclick = closeModal;
addBookForm.onsubmit = addBook;