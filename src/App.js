import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Profile from './components/Profile';
import Home from './components/Home';
import Catogary from './components/Catogary';
import Itemdetails from './components/Itemdetails';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

function App() {

  return (
    <>
    <Router>
    <div className="containert1">
    <header>  
      <Navbar/>
    </header>
    <main>
      <Routes >
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/category/:name" element={<Catogary/>}/>
        <Route path="/Itemdetails/:id" element={<Itemdetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <ToastContainer/>
    </main>
    <footer>
      <Footer/>
    </footer>
    </div>
    </Router>
    </>
  );
}

export default App;
