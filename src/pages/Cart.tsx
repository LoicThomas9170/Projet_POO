import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingBag, Trash2, ChevronLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryTime: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the order to a server
    setOrderPlaced(true);
    clearCart();
  };
  
  const isFormValid = () => {
    return (
      customerInfo.name.trim() !== '' &&
      customerInfo.email.trim() !== '' &&
      customerInfo.phone.trim() !== '' &&
      customerInfo.address.trim() !== '' &&
      customerInfo.deliveryTime !== ''
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Votre Panier</h1>
      
      {orderPlaced ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="text-green-600 h-8 w-8" />
          </div>
          <h2 className="text-2xl font-semibold text-green-800 mb-3">Commande Validée!</h2>
          <p className="text-gray-700 mb-6">
            Merci pour votre commande. Vous recevrez bientôt un e-mail de confirmation.
          </p>
          <Link
            to="/"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
          >
            Retour à l'accueil
          </Link>
        </div>
      ) : (
        <>
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold text-amber-800 mb-4">Articles ({cartItems.length})</h2>
                  
                  {cartItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-200 last:border-0">
                      <div className="flex items-center mb-3 sm:mb-0">
                        <img 
                          src={item.image || 'https://images.pexels.com/photos/1082343/pexels-photo-1082343.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-amber-800">{item.name}</h3>
                          <p className="text-gray-600 text-sm">
                            {item.ingredients.map(i => i.name).slice(0, 2).join(', ')}
                            {item.ingredients.length > 2 ? '...' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full sm:w-auto">
                        <span className="text-amber-800 font-bold mr-4">{item.price.toFixed(2)} €</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center mt-6">
                    <button
                      onClick={clearCart}
                      className="text-gray-700 hover:text-red-600 transition duration-200"
                    >
                      Vider le panier
                    </button>
                    <Link
                      to="/showcase"
                      className="text-amber-600 hover:text-amber-700 flex items-center"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Continuer mes achats
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-semibold text-amber-800 mb-4">Récapitulatif</h2>
                  
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="text-gray-800">{getCartTotal().toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livraison</span>
                      <span className="text-gray-800">3.00 €</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mb-6">
                    <span className="text-gray-800 font-medium">Total</span>
                    <span className="text-xl font-bold text-amber-800">{(getCartTotal() + 3).toFixed(2)} €</span>
                  </div>
                  
                  {showForm ? (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nom complet</label>
                        <input
                          type="text"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Téléphone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Adresse de livraison</label>
                        <textarea
                          name="address"
                          value={customerInfo.address}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          rows={3}
                          required
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Horaire de livraison</label>
                        <select
                          name="deliveryTime"
                          value={customerInfo.deliveryTime}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          required
                        >
                          <option value="">Choisir un horaire</option>
                          <option value="morning">Matin (8h - 12h)</option>
                          <option value="afternoon">Après-midi (12h - 16h)</option>
                          <option value="evening">Soir (16h - 20h)</option>
                        </select>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={!isFormValid()}
                        className={`w-full py-3 rounded-md flex items-center justify-center font-semibold ${
                          isFormValid()
                            ? 'bg-amber-600 text-white hover:bg-amber-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <CreditCard className="mr-2 h-5 w-5" />
                        Payer {(getCartTotal() + 3).toFixed(2)} €
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="w-full mt-3 py-2 text-amber-600 hover:text-amber-700"
                      >
                        Retour au panier
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 font-semibold"
                    >
                      Passer la commande
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 rounded-lg p-8 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-amber-600 mb-3" />
              <h2 className="text-xl font-semibold text-amber-800 mb-2">Votre panier est vide</h2>
              <p className="text-gray-700 mb-4">
                Vous n'avez aucun article dans votre panier. Parcourez notre vitrine ou créez votre propre recette.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/showcase"
                  className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
                >
                  Explorer la vitrine
                </Link>
                <Link
                  to="/configurator"
                  className="inline-block bg-white border border-amber-600 hover:bg-amber-50 text-amber-600 font-semibold px-6 py-3 rounded-md transition duration-300"
                >
                  Créer ma recette
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;