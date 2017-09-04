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
    this.setState({ query })
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
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
