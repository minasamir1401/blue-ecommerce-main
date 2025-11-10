import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { FaCheck } from "react-icons/fa";
import toast from 'react-hot-toast';
import './ProductCard.css';

function ProductCard({ item }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { cartItems, addToCart, addToFavorites, favorites, removeFromFavorites } = useContext(CartContext);

  const isInCart = cartItems.some(i => i.id === item.id);
  const isInFav = favorites.some(i => i.id === item.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
    toast.success(
      <div className='toast-wrapper'>
        <img src={item.images[0]} alt="" className='toast-img'/>
        <div className="toast-content">
          <strong>{item.title}</strong>
          {t('common.addedToCart')}
          <div>
            <button className='btn' onClick={() => navigate('/cart')}>{t('common.viewCart')}</button>
          </div>
        </div>
      </div>,
      { duration: 3500 }
    );
  };

  const handleAddToFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInFav) {
      removeFromFavorites(item.id);
      toast.error(`${item.title} ${t('common.removedFromFavorites')}`);
    } else {
      addToFavorites(item);
      toast.success(`${item.title} ${t('common.addedToFavorites')}`);
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.origin + `/products/${item.id}`
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/products/${item.id}`);
      toast.success('Link copied to clipboard');
    }
  };

  const renderStars = () => {
    const rating = Math.round(item.rating || 4);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} />);
      } else if (i === rating && item.rating % 1 >= 0.5) {
        stars.push(<FaRegStarHalfStroke key={i} />);
      } else {
        stars.push(<FaRegStarHalfStroke key={i} className="empty-star" />);
      }
    }
    return stars;
  };

  return (
    <article className={`product-card ${isInCart ? 'in-cart' : ''}`}>
      <Link to={`/products/${item.id}`} className="product-card__link">
        {isInCart && (
          <span className='product-card__status'>
            <FaCheck /> {t('common.inCart')}
          </span>
        )}
        
        <div className="product-card__image">
          <img src={item.images[0]} alt={item.title} loading="lazy" />
        </div>

        <div className="product-card__content">
          <h3 className="product-card__title">{item.title}</h3>

          <div className="product-card__rating">
            {renderStars()}
            <span className="product-card__rating-text">({item.rating || 4.0})</span>
          </div>

          <p className='product-card__price'>
            <span>${item.price}</span>
            {item.discountPercentage && (
              <span className="product-card__discount">
                {Math.round(item.discountPercentage)}% خصم
              </span>
            )}
          </p>
        </div>
      </Link>

      <div className="product-card__actions">
        <button 
          className={`product-card__action-btn ${isInCart ? 'in-cart' : ''}`} 
          onClick={handleAddToCart}
          aria-label={t('common.addToCart')}
        >
          <FaCartArrowDown />
        </button>
        <button 
          className={`product-card__action-btn ${isInFav ? 'in-fav' : ''}`} 
          onClick={handleAddToFav}
          aria-label={isInFav ? t('common.removeFromFavorites') : t('common.addToFavorites')}
        >
          <FaRegHeart />
        </button>
        <button 
          className="product-card__action-btn" 
          onClick={handleShare}
          aria-label={t('common.share')}
        >
          <FaShare />
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

