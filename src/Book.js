import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookshelfChanger from './BookshelfChanger'

class Book extends Component {
  render() {
    const { book } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={this.styleCover(book)}></div>
            <BookshelfChanger
              book={book}
              update={book.update}
            />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(' & ')}</div>
      </div>
    )
  }

  styleCover = (book) => {
    debugger
    return {
    width: 128,
    height: 193,
    backgroundImage: `url("${book.previewLink}")`
  }}
}

Book.PropTypes = {
  book: PropTypes.object.isRequired
}

export default Book
