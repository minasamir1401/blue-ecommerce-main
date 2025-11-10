import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../../components/context/CartContext';
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import './cart.css';
import PageTransition from '../../components/PageTransition';

function Cart() {
  const { t } = useTranslation();
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <PageTransition>
      <div className='cart-page'>
        <div className="container">
          <div className="cart-page__header">
            <h1>{t('cart.shoppingCart')}</h1>
            <p>{cartItems.length} {t('cart.itemsInCart')}</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="cart-page__empty">
              <p>{t('cart.cartEmpty')}</p>
              <a href="/" className="btn">{t('cart.shopNow')}</a>
            </div>
          ) : (
            <div className="cart-page__content">
              <div className="cart-page__items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item__image">
                      <img src={item.images[0]} alt={item.title} />
                    </div>

                    <div className="cart-item__details">
                      <h3 className="cart-item__title">{item.title}</h3>
                      <p className="cart-item__price">${item.price}</p>

                      <div className="cart-item__quantity">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="cart-item__quantity-btn"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus />
                        </button>
                        <span className="cart-item__quantity-value">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="cart-item__quantity-btn"
                          aria-label="Increase quantity"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    <div className="cart-item__actions">
                      <p className="cart-item__subtotal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="cart-item__delete"
                        aria-label="Remove item"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-page__summary">
                <div className="cart-summary">
                  <h2 className="cart-summary__title">{t('cart.orderSummary')}</h2>
                  
                  <div className="cart-summary__row">
                    <span>{t('cart.productsCount')}:</span>
                    <span>{cartItems.length}</span>
                  </div>
                  
                  <div className="cart-summary__row">
                    <span>{t('cart.subtotal')}:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="cart-summary__row cart-summary__row--total">
                    <span>{t('cart.total')}:</span>
                    <span className="cart-summary__total">${total.toFixed(2)}</span>
                  </div>

                  <button className="cart-summary__checkout btn">
                    {t('cart.placeOrder')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Cart;