
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/HomePage/HomePage';
import { CartPage } from './pages/CartPage/CartPage';
import { BookDetails } from './pages/BookDetails/BookDetails';





function App() {

  return (

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/book/:isbn13" element={<BookDetails />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="*" element={<Home />} /> 
</Routes>
       
    
  )
}

export default App
