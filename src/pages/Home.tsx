import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Croissant, Cookie, ShoppingBag, Heart } from 'lucide-react';
import evanImage from '../images/evan.png';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-96 sm:h-[500px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Boulangerie Digitale
          </h1>
          <p className="text-lg sm:text-xl text-white mb-8 max-w-2xl">
            Créez votre pâtisserie personnalisée selon vos envies ou choisissez parmi nos recettes populaires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/configurator"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300 flex items-center justify-center"
            >
              Créer ma recette <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/showcase"
              className="bg-white hover:bg-gray-100 text-amber-800 font-semibold px-6 py-3 rounded-md transition duration-300 flex items-center justify-center"
            >
              Voir la vitrine <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-amber-800 text-center mb-12">
            Comment ça fonctionne
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-100 p-4 rounded-full">
                  <Croissant className="h-8 w-8 text-amber-700" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-amber-800 text-center mb-3">Créez votre pâtisserie</h3>
              <p className="text-gray-700 text-center">
                Utilisez notre configurateur pour choisir la base, les garnitures et les décorations de votre pâtisserie personnalisée.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-100 p-4 rounded-full">
                  <Heart className="h-8 w-8 text-amber-700" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-amber-800 text-center mb-3">Enregistrez en favoris</h3>
              <p className="text-gray-700 text-center">
                Sauvegardez vos créations préférées et partagez-les dans notre vitrine communautaire.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-100 p-4 rounded-full">
                  <ShoppingBag className="h-8 w-8 text-amber-700" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-amber-800 text-center mb-3">Commandez</h3>
              <p className="text-gray-700 text-center">
                Ajoutez vos créations au panier ou commandez directement depuis notre vitrine de recettes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-amber-800 text-center mb-4">
            Nos créations populaires
          </h2>
          <p className="text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Découvrez une sélection de nos pâtisseries les plus appréciées, ou créez la vôtre avec notre configurateur.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Recipe Card 1 */}
            <div className="bg-amber-50 rounded-lg overflow-hidden shadow-md transform hover:shadow-lg transition duration-300">
              <img 
                src="https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=600" 
                alt="Croissant au Chocolat" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">Croissant au Chocolat</h3>
                <p className="text-gray-700 mb-4 line-clamp-2">
                  Notre délicieux croissant garni de chocolat noir fondu et saupoudré de sucre glace.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-800">5,50 €</span>
                  <Link 
                    to="/showcase" 
                    className="text-amber-600 hover:text-amber-800 font-medium flex items-center transition duration-200"
                  >
                    Voir plus <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Recipe Card 2 */}
            <div className="bg-amber-50 rounded-lg overflow-hidden shadow-md transform hover:shadow-lg transition duration-300">
            <img 
  src={evanImage} 
  alt="Éclair à la Vanille" 
  className="w-full h-48 object-cover"
/>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">Éclair à la Vanille</h3>
                <p className="text-gray-700 mb-4 line-clamp-2">
                  Éclair garni de crème pâtissière à la vanille et nappé de glaçage.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-800">7,20 €</span>
                  <Link 
                    to="/showcase" 
                    className="text-amber-600 hover:text-amber-800 font-medium flex items-center transition duration-200"
                  >
                    Voir plus <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Recipe Card 3 */}
            <div className="bg-amber-50 rounded-lg overflow-hidden shadow-md transform hover:shadow-lg transition duration-300">
              <img 
                src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Millefeuille aux Fruits" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">Millefeuille aux Fruits</h3>
                <p className="text-gray-700 mb-4 line-clamp-2">
                  Millefeuille garni de crème pâtissière et fruits rouges frais.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-800">6,50 €</span>
                  <Link 
                    to="/showcase" 
                    className="text-amber-600 hover:text-amber-800 font-medium flex items-center transition duration-200"
                  >
                    Voir plus <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/showcase" 
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
            >
              Voir toutes nos recettes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-amber-800 mb-4">
            Prêt à créer votre chef-d'œuvre ?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Utilisez notre configurateur pour créer une pâtisserie unique selon vos goûts, ou choisissez parmi nos créations populaires.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/configurator"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300 flex items-center justify-center"
            >
              <Cookie className="mr-2 h-5 w-5" />
              Créer ma recette
            </Link>
            <Link
              to="/showcase"
              className="bg-amber-800 hover:bg-amber-900 text-white font-semibold px-6 py-3 rounded-md transition duration-300 flex items-center justify-center"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Explorer la vitrine
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;