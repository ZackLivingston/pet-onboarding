// setting up DOM access variables
const popups = document.getElementById('popups')
const inputTitle = document.getElementById('title')
const inputAuthor = document.getElementById('author')
const inputISBN = document.getElementById('isbn')
const submitButton = document.getElementById('submit')
const inputForm = document.getElementById('input-form')

inputForm.addEventListener('submit', onSubmit)


// classes

class Book {
    constructor(title, author, isbn) {
        this.title = title,
        this.author = author,
        this.isbn = isbn
    }
}

class UI {
    static addBook(book) {
        const list = document.getElementById('book-list')
        const newRow = document.createElement('div')
        newRow.className = 'book-row'
        const title = document.createElement('h5')
        title.className = 'book-title'
        title.innerText = book.title
        const author = document.createElement('h5')
        author.className = 'book-author'
        author.innerText = book.author
        const isbn = document.createElement('h5')
        isbn.className = 'book-isbn'
        isbn.innerText = book.isbn
        const deleteBook = document.createElement('h5')
        deleteBook.className = 'book-delete'
        deleteBook.innerText = 'X'
    
        newRow.appendChild(title)
        newRow.appendChild(author)
        newRow.appendChild(isbn)
        newRow.appendChild(deleteBook)
        newRow.addEventListener('click', UI.deleteBook)
    
        list.appendChild(newRow)
    
        setPopup('Book Added', 'green')
    }

    static deleteBook() {
        if (event.target.className === 'book-delete') {
            event.target.parentElement.remove()
            setPopup('Book deleted', 'red')
        }
    }
}



// functions

function onSubmit(event) {
    event.preventDefault()
    console.log(inputTitle.value)
    console.log(inputAuthor.value)
    console.log(inputISBN.value)
    console.log('submit')
    var newBook = new Book(inputTitle.value, inputAuthor.value, inputISBN.value)
    UI.addBook(newBook)
    // reset fields
    inputTitle.value = ''
    inputAuthor.value = ''
    inputISBN.value = ''
}

function setPopup(message, color) {
    popups.style.display = 'block'
    popups.style.backgroundColor = color
    popups.innerText = message
    setTimeout(() => {
        popups.style.display = 'none'
    },3000)
}