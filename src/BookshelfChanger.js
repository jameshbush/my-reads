import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookshelfChanger extends Component {
  handleChange = (event) => {
    event.preventDefault()
    this.props.update({ book: this.props.book, shelf: event.target.value })
  }

  render() {
    const { shelves, book } = this.props
    return (
      <div className="book-shelf-changer">
        <form>
          <select onChange={this.handleChange} defaultValue={book.shelf || 'none'}>
            <option value="instructions" disabled>Move to...</option>
            {shelves.map(shelf =>
              <option
                key={shelf.key}
                value={shelf.key}
              >
                {shelf.name}
              </option>
            )}
          </select>
        </form>
      </div>
    )
  }
}

BookshelfChanger.PropTypes = {
  book: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired
}

export default BookshelfChanger
