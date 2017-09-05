import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookshelfChanger from './BookshelfChanger'

class Book extends Component {
  render() {
    const { book, update, shelves } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={this.styleCover(book)}></div>
            <BookshelfChanger
              book={book}
              update={update}
              shelves={shelves}
            />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(' & ')}</div>
      </div>
    )
  }

  styleCover = (book) => {
    return {
    width: 128,
    height: 193,
    backgroundImage: `url("${book.imageLinks.thumbnail}")`
  }}
}

Book.PropTypes = {
  book: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired
}

export default Book
