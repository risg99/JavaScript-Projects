// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() { }

// Add Book to List
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');

    // Create a new tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function (msg, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(msg));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Timeout after 2 secs
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 2000);

    // Instantiate UI constructor
    const ui = new UI();
    ui.clearFields();
}

// Delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // Instantiate book constuctor
    const book = new Book(title, author, isbn);

    // Instantiate UI constructor
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        // Add book to list
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearFields();

    }


    e.preventDefault();

});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
    // Instantiate UI constructor
    const ui = new UI();
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book Removed!','success');
    e.preventDefault();
});