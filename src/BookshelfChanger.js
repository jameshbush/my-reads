import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookshelfChanger extends Component {
  handleChange = (event) => {
    event.preventDefault()
    this.props.update({ book: this.props.book, shelf: event.target.value })
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <form>
          <select onChange={this.handleChange}>
            <option value="instructions" disabled>Move to...</option>
            {this.props.shelves.map(shelf =>
              <option
                key={shelf.key}
                value={shelf.key}
                selected={this.props.book.shelf === shelf.key}
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
