import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Croissant } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Croissant className="h-6 w-6" />
              <h3 className="text-xl font-bold">Boulangerie Digitale</h3>
            </div>
            <p className="mb-4">
              Notre boulangerie digitale vous propose des pains et pâtisseries personnalisables selon vos goûts.
              Créez votre recette unique ou choisissez parmi nos créations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-50 hover:text-amber-200 transition duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-amber-50 hover:text-amber-200 transition duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-amber-50 hover:text-amber-200 transition duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-amber-200 transition duration-200">Accueil</Link>
              </li>
              <li>
                <Link to="/configurator" className="hover:text-amber-200 transition duration-200">Configurateur</Link>
              </li>
              <li>
                <Link to="/showcase" className="hover:text-amber-200 transition duration-200">Vitrine</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-amber-200 transition duration-200">Panier</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Rue de la Boulangerie, Paris</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@boulangerieDigitale.fr</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-amber-700 mt-8 pt-6 text-center">
          <p>© {new Date().getFullYear()} Boulangerie Digitale. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;