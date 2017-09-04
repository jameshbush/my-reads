import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
  render() {
    const { books, name } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.bookshelfTitle(name)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

  bookshelfTitle(name) {
    return (name.charAt(0).toUpperCase() + name.slice(1))
      .match(/[A-Z][a-z]+/g)
      .join(' ');
  }
}

Bookshelf.PropTypes = {
  books: PropTypes.array.isRequired
}

export default Bookshelf
