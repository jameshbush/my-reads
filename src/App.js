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
    BooksAPI.search(query, 100)
    .then(results => {
      let books = this.state.books
      if (results instanceof Array && results.length > 0) {
        results.forEach(result => {
          books.some(b => b.id === result.id) || books.push(result)
        })
      }
      this.setState({ query, books })
    })
  }

  update = ({ book = {}, shelf = '' }) => {
    BooksAPI.update(book, shelf)
    .then(bookIdsByShelfIds => {
      let books = this.state.books

      for (const shelfId in bookIdsByShelfIds) {
        bookIdsByShelfIds[shelfId].forEach(bookId => {
          let book = books.find(book => book.id === bookId)
          book.shelf = shelfId
        })

        this.setState({ books })
      }
    })
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
