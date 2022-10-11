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

addBookBtn.onclick = openModal;
overlay.onclick = closeModal;