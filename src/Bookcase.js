import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import sortBy from 'sort-by'

class Bookcase extends Component {
  render() {
    let { books } = this.props
    const { query } = this.props
    const emptyShelves = [
      { books: [], key: 'currentlyReading', name: 'Currently Reading' },
      { books: [], key: 'wantToRead', name: 'Want to Read' },
      { books: [], key: 'read', name: 'Read' },
      { books: [], key: 'none', name: 'None' }
    ]
    books = this.filterBooks(books, query)
    books = books.sort(sortBy('title'))
    const shelvedBooks = this.shelveBooks(books, emptyShelves)

    return (
      <div className="list-books">
        <div className="list-books-title">
          <div className="open-search">
            <Link
              to='/search'
            >Add a book</Link>
          </div>
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelvedBooks
            .filter(shelf => shelf.books.length > 0)
            .map(shelf => (
              <Bookshelf
                key={shelf.key}
                name={shelf.name}
                books={shelf.books}
              />
          ))}
        </div>
      </div>
    )
  }

  shelveBooks(books, shelves) {
    const shelvedBooks = books.reduce((memo, book) => {
      const shelf = shelves.find((s) => s.key === book.shelf) ||
                    shelves.find((s) => s.key === 'none')
      shelf.books.push(book)
      return memo;
    }, shelves)
    return shelvedBooks;
  }

  filterBooks(books, query) {
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      books = books.filter(b => match.test(b.title + b.authors))
    }
    return books;
  }
}

Bookcase.PropTypes = {
  books: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired
}

export default Bookcase
