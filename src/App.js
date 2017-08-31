import React, { Component } from 'react'
import { ReactRouter, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import Bookcase from './Bookcase'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          path='/search'
          render={({ history }) => (
            <SearchBooks
              books={this.state.books}
            />
        )}/>
        <Route
          path='/bookcase'
          render={({ history }) => (
            <Bookcase
              books={this.state.books}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
