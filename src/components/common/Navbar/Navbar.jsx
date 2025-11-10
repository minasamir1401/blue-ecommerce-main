import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus, FaSearch, FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { MdLanguage } from "react-icons/md";
import Logo from '../../../img/logo.png';
import { CartContext } from '../../context/CartContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, favorites } = useContext(CartContext);
  const { t, i18n } = useTranslation();
  
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    // Refresh page to apply language changes
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const NavLinks = [
    { title: t('navbar.home'), link: "/" },
    { title: t('navbar.about'), link: "/about" },
    { title: t('navbar.accessories'), link: "/accessories" },
    { title: t('navbar.blog'), link: "/blog" },
    { title: t('navbar.contact'), link: "/contact" },
  ];

  useEffect(() => {
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}&limit=5`
        );
        const data = await res.json();
        setSuggestions(data.products || []);
      } catch (error) {
        console.error("Search Error:", error);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  useEffect(() => {
    setSuggestions([]);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setSuggestions([]);
      setIsSearchFocused(false);
    }
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/products/${productId}`);
    setSearchTerm("");
    setSuggestions([]);
    setIsSearchFocused(false);
  };

  return (
    <header className="navbar">
      {/* Top Header */}
      <div className="navbar__top">
        <div className="container">
          <div className="navbar__top-content">
            <Link className="navbar__logo" to="/" aria-label="Home">
              <img src={Logo} alt="Reda Store Logo" />
            </Link>

            <form onSubmit={handleSearchSubmit} className="navbar__search">
              <input
                type="text"
                name="search"
                id="search"
                placeholder={t('navbar.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                autoComplete="off"
                aria-label="Search products"
              />
              <button type="submit" aria-label="Search">
                <FaSearch />
              </button>
              {suggestions.length > 0 && isSearchFocused && (
                <ul className="navbar__suggestions">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleSuggestionClick(item.id)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <img src={item.images[0]} alt={item.title} />
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </form>

            <div className="navbar__icons">
              <button
                className="navbar__language-toggle"
                onClick={toggleLanguage}
                aria-label="Toggle language"
                title={i18n.language === "ar" ? t('common.switchToEnglish') : t('common.switchToArabic')}
              >
                <MdLanguage />
                <span className="navbar__language-text">{i18n.language === "ar" ? "EN" : "AR"}</span>
              </button>

              <Link to="/favorites" className="navbar__icon" aria-label="Favorites">
                <FaRegHeart />
                {favorites.length > 0 && (
                  <span className="navbar__icon-count">{favorites.length}</span>
                )}
              </Link>

              <Link to="/cart" className="navbar__icon" aria-label="Cart">
                <TiShoppingCart />
                {cartItems.length > 0 && (
                  <span className="navbar__icon-count">{cartItems.length}</span>
                )}
              </Link>

              <button
                className="navbar__mobile-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Header / Navigation */}
      <nav className="navbar__bottom">
        <div className="container">
          <div className="navbar__bottom-content">
            <div className="navbar__category">
              <button
                className="navbar__category-btn"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                aria-expanded={isCategoryOpen}
                aria-label="Browse categories"
              >
                <IoMdMenu />
                <span>{t('navbar.browseCategory')}</span>
                <MdOutlineArrowDropDown className={isCategoryOpen ? 'open' : ''} />
              </button>

              <div className={`navbar__category-list ${isCategoryOpen ? 'active' : ''}`}>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <ul className={`navbar__links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              {NavLinks.map((item) => (
                <li
                  key={item.link}
                  className={location.pathname === item.link ? 'active' : ''}
                >
                  <Link to={item.link} onClick={() => setIsMobileMenuOpen(false)}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="navbar__auth">
              <Link to="/login" aria-label={t('navbar.signIn')} title={t('navbar.signIn')}>
                <PiSignInBold />
              </Link>
              <Link to="/register" aria-label={t('navbar.register')} title={t('navbar.register')}>
                <FaUserPlus />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

