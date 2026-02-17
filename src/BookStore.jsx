import React, { useState } from "react";

function BookStore() {
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    author: "",
    price: ""
  });

  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [showList, setShowList] = useState(false); // 🔥 controls view

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!book.isbn || !book.title || !book.author || !book.price) {
      setError("All fields are required!");
      return;
    }

    setBooks([...books, book]);
    setBook({ isbn: "", title: "", author: "", price: "" });
    setError("");
  };

  /* ================= FORM VIEW ================= */
  if (!showList) {
    return (
      <div className="bookstore-card">
        <h2>BookStore Management</h2>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label>ISBN</label>
            <input name="isbn" value={book.isbn} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input name="title" value={book.title} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input name="author" value={book.author} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input name="price" value={book.price} onChange={handleChange} />
          </div>

          <div className="button-group">
            <button type="submit">Add Book</button>
            <button type="button" onClick={() => setShowList(true)}>
              View Books
            </button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  /* ================= LIST VIEW ================= */
  return (
    <div className="bookstore-card">
      <h2>Book List</h2>

      {books.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <ul>
          {books.map((b, index) => (
            <li key={index}>
              <strong>{b.title}</strong> by {b.author} | ISBN: {b.isbn} | Price: ₹{b.price}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => setShowList(false)}>Back</button>
    </div>
  );
}

export default BookStore;
