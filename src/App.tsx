import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Configurator from './pages/Configurator';
import Showcase from './pages/Showcase';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-amber-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/configurator" element={<Configurator />} />
                <Route path="/showcase" element={<Showcase />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </FavoritesProvider>
    </Router>
  );
}

export default App;