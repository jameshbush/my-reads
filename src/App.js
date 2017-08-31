import React, { Component } from 'react'
import { ReactRouter, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends Component {
  state = {}

  render() {
    return (
      <div className="app">
        <Route
          path='/search'
          render={({ history }) => (
            <SearchBooks />
        )}/>
        <Route
          path='/bookshelf'
          render={({ history }) => (
            <Bookshelf />
        )}/>
      </div>
    )
  }
}

export default BooksApp
