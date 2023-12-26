import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { getLoginUser } from './store/UserSlice';
import {
  Header,
  Home,
  Footer,
  Shelf,
  About,
  Search,
  Login,
  Cart,
  Detail,
  Profile
} from './Components';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    store.dispatch(getLoginUser());
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelf" element={<Shelf />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
