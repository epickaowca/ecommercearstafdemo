import React, { useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Details from './View/Details'
import Shop from './View/Shop'
import Home from './View/Home'
import WishList from './View/WishList'
import { fetchRecomended, fetchInstaPicture, fetchFooterContent, fetchFreeDelivery } from './redux/ducks/mainPageReducer'
import { checkSavedInLocalStorage, loadCategories } from './redux/ducks/shopReducer'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(checkSavedInLocalStorage())
    dispatch(loadCategories())
  }, [])
  return (
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sklep" element={<Shop />} />
              <Route path="/kategoria/:filter" element={<Shop />} />
              <Route path="/filter/:filter" element={<Shop />} />
              <Route path="/wishList" element={<WishList />} />
              <Route path="products/:id" element={<Details />} />
            </Routes>
        </Router>
  );
}

export default App;
