
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/HomePage';
import { CartPage } from './pages/CartPage';





function App() {

  return (

<Routes>
  <Route path="/" element={<Home/>}/>
  {/* <Route path="/book/:id" element={<BookDetails/>}/> */}
  <Route path="/cart" element={<CartPage />}/>
</Routes>
       
    
  )
}

export default App
