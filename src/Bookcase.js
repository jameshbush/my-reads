import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import sortBy from 'sort-by'

class Bookcase extends Component {
  render() {
    let { books, update } = this.props
    const { query } = this.props
    const emptyShelves = [
      { key: 'currentlyReading', name: 'Currently Reading' },
      { key: 'wantToRead', name: 'Want to Read' },
      { key: 'read', name: 'Read' },
      { key: 'none', name: 'None' }
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
            .map(shelf => (
              shelf.books && <Bookshelf
                key={shelf.key}
                name={shelf.name}
                books={shelf.books}
                update={update}
                shelves={emptyShelves}
              />
          ))}
        </div>
      </div>
    )
  }

  shelveBooks(books, shelves) {
    books.forEach((book) => {
      const shelf = shelves.find(s => s.key === book.shelf) ||
                    shelves.find(s => s.key === 'none');

      shelf.books || (shelf.books = []);
      shelf.books.push(book);
    })
    return shelves;
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
  query: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired
}

export default Bookcase
