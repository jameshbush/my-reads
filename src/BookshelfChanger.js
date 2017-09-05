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
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </form>
      </div>
    )
  }
}

BookshelfChanger.PropTypes = {
  book: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

export default BookshelfChanger
