

import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import img from '../../../finalProject assets/finalProject assets/images/freshcart-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faTiktok, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from '../../Contexts/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { userToken, setUserToken } = useContext(AuthContext);

  const signOut = () => {
    setUserToken("");
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6">
      <div className="relative pb-16 sm:pb-24">
        <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
          <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <NavLink to="/">
                <span className="sr-only">Fresh Cart</span>
                <img className="w-auto h-2 sm:h-10" src={img} loading="lazy" width="202" height="10" alt="Company Logo" />
              </NavLink>
              <div className="flex items-center -mr-2 md:hidden">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-50 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50"
                  type="button"
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {userToken && (
            <div
              className={`fixed top-0 right-0 z-50 h-full bg-white shadow-md transform ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              } transition-transform duration-300 ease-in-out md:hidden`}
            >
              <ul className="flex flex-col p-8 space-y-4 list-none">
                <li><NavLink to="/" className="text-base font-normal text-gray-500 hover:text-gray-900" onClick={toggleMenu}>Home</NavLink></li>
                <li><NavLink to="/brands" className="text-base font-normal text-gray-500 hover:text-gray-900" onClick={toggleMenu}>Brands</NavLink></li>
                <li><NavLink to="/categories" className="text-base font-normal text-gray-500 hover:text-gray-900" onClick={toggleMenu}>Categories</NavLink></li>
                <li><NavLink to="/products" className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50" onClick={toggleMenu}>Products</NavLink></li>
                <li><NavLink to="/cart" className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50" onClick={toggleMenu}>Cart</NavLink></li>
                <li><NavLink to="/wishlist" className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50" onClick={toggleMenu}>Wishlist</NavLink></li>

              </ul>
            </div>
          )}

          {userToken && (
            <div className="hidden md:flex md:space-x-6 list-none">
            
             <li><NavLink to="/" className="text-base font-normal text-gray-500 hover:text-gray-900">Home</NavLink></li>
              <li><NavLink to="/brands" className="text-base font-normal text-gray-500 hover:text-gray-900">Brands</NavLink></li>
              <li><NavLink to="/categories" className="text-base font-normal text-gray-500 hover:text-gray-900">Categories</NavLink></li>
              <li><NavLink to="/products" className="text-base font-normal text-gray-500 hover:text-gray-900">Products</NavLink></li>
              <li><NavLink to="/cart" className="text-base font-normal text-gray-500 hover:text-gray-900">Carts</NavLink></li>
              <li><NavLink to="/wishlist" className="text-base font-normal text-gray-500 hover:text-gray-900">WishList</NavLink></li>

            </div>
          )}

          <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            <div className="flex rounded-full space-x-2">
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon className="text-black rounded-md pl-2" icon={faFacebook} />
              <FontAwesomeIcon className="text-black pl-2" icon={faTiktok} />
              <FontAwesomeIcon className="text-black pl-2" icon={faTwitter} />
              <FontAwesomeIcon className="text-black pl-2" icon={faLinkedin} />
              <FontAwesomeIcon className="text-black pl-2" icon={faYoutube} />
            </div>
            <ul className='flex space-x-2'>
              {!userToken && (
                <>
                  <li><NavLink to="/login" className="text-base font-normal text-gray-500 hover:text-gray-900">Login</NavLink></li>
                  <li><NavLink to="/register" className="text-base font-normal text-gray-500 hover:text-gray-900">Register</NavLink></li>
                </>
              )}
              {userToken && (
                <li><button onClick={signOut} className="text-base font-normal text-gray-500 hover:text-gray-900">Sign out</button></li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
