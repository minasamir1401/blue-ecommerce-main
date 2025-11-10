import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../../components/context/CartContext';
import PageTransition from '../../components/PageTransition';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import './Favorites.css';

function Favorites() {
  const { t } = useTranslation();
  const { favorites } = useContext(CartContext);

  return (
    <PageTransition>
      <div className="favorites-page">
        <div className="container">
          <div className="favorites-page__header">
            <h1>{t('favorites.myFavorites')}</h1>
            <p>{favorites.length} {t('favorites.favoritesCount')}</p>
          </div>

          {favorites.length === 0 ? (
            <div className="favorites-page__empty">
              <p>{t('favorites.noFavorites')}</p>
              <a href="/" className="btn">{t('favorites.browseProducts')}</a>
            </div>
          ) : (
            <div className="favorites-page__products">
              {favorites.map(item => (
                <ProductCard item={item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Favorites;