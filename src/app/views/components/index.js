import React, { Fragment, useState, useEffect } from 'react';
import { Navbar } from '../../components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../../styles/App.css'
import { list } from '../../data'
import { CartPage } from './Cart'
import { Home } from './Home'
import { Checkout } from './Checkout'
import UserProfileContextProvider  from '../../lib/UserProfileContext'
import {Confirm} from './Confirm'

const App = props => {
  const { items, saveLocalStorage } = props
  const [category, setCategory] = useState(0)
  const [isFiltering, setFiltering] = useState(false)
  const [filterRed, setfilterRed] = useState(false)
  const [count, setCount] = useState(1);

  const loadCategory = i => { setCategory(i) }
  const filterResults = (input) => {
    let fullList = list.flat()
    let results = fullList.filter(item => {
      const name = item.name.toLowerCase()
      const term = input.toLowerCase()
      return name.indexOf(term) > -1
    })
    setfilterRed(results)
  }
  useEffect(() => {
    saveLocalStorage(items)
  }, [items])//2éme argument:dépendnace

  return (
    <Fragment>
      <Router>
        <UserProfileContextProvider>
          <Navbar filter={filterResults} setFiltering={setFiltering} count={count} />

          {/* Routes */}
          <Route exact path="/" component={() => <Home
            category={category}
            loadCategory={loadCategory}
            isFiltering={isFiltering}
            list={list}
            filterRed={filterRed} />}
          />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/delivery" component={Confirm} />
        </UserProfileContextProvider>
      </Router>
    </Fragment>
  );
}
export default App;
