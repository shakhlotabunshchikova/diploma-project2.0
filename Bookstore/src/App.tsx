import { Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Home } from './pages/HomePage/HomePage';
import { CartPage } from './pages/CartPage/CartPage';
import { BookDetails } from './pages/BookDetails/BookDetails';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';



const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet /> 
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="book/:isbn13" element={<BookDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;