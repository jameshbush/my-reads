import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import Bookcase from './Bookcase'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({ books })
    })
  }

  updateQuery = (query) => {
    BooksAPI.search(query, 100).then(searchResults => {
      let books = this.state.books

      if (searchResults.hasOwnProperty('length') && searchResults.length > 0)
        searchResults.forEach(result => { this.findBookById(result.id, books) || books.push(result) })

      this.setState({ query, books })
    })
  }

  update = ({ book = {}, shelf = '' }) => {
    let books = this.state.books

    if (shelf === 'none')
      this.findBookById(book.id, books).shelf = null

    BooksAPI.update(book, shelf).then(shelvedBookIds => {
      books = this.updateBookShelves(books, shelvedBookIds)
      this.setState({ books })
    })
  }

  findBookById = (bookId, books) => {
    return books.find(book => bookId === book.id)
  }

  updateBookShelves = (books, shelvedBookIds) => {
    for (const shelf in shelvedBookIds) {
      shelvedBookIds[shelf].forEach(bookId => {
        this.findBookById(bookId, books).shelf = shelf
      })
    }
    return books
  }

  render() {
    return (
      <div className="app">
        <Route
          path='/search'
          render={({ history }) => (
            <SearchBooks
              query={this.state.query}
              updateQuery={this.updateQuery}
            />
        )}/>
        <Route
          path='/'
          render={({ history }) => (
            <Bookcase
              books={this.state.books}
              query={this.state.query}
              update={this.update}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
