import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, Croissant } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <nav className="bg-amber-800 text-amber-50 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Croissant className="h-8 w-8" />
            <span className="hidden sm:inline">Boulangerie Digitale</span>
            <span className="inline sm:hidden">B.D.</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-amber-200 transition duration-200">
              Accueil
            </Link>
            <Link to="/configurator" className="hover:text-amber-200 transition duration-200">
              Configurateur
            </Link>
            <Link to="/showcase" className="hover:text-amber-200 transition duration-200">
              Vitrine
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/favorites" className="hover:text-amber-200 transition duration-200">
                <Heart className="h-6 w-6" />
              </Link>
              <Link to="/cart" className="relative hover:text-amber-200 transition duration-200">
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-50 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-3">
            <Link
              to="/"
              className="block hover:text-amber-200 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/configurator"
              className="block hover:text-amber-200 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Configurateur
            </Link>
            <Link
              to="/showcase"
              className="block hover:text-amber-200 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Vitrine
            </Link>
            <div className="flex items-center gap-6 pt-2">
              <Link
                to="/favorites"
                className="hover:text-amber-200 transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  <span>Favoris</span>
                </div>
              </Link>
              <Link
                to="/cart"
                className="relative hover:text-amber-200 transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Panier</span>
                  {cartItems.length > 0 && (
                    <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;