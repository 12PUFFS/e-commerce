import { Link } from 'react-router-dom';

import './Cart.css';
import { useContext, useState } from 'react';
import { CartContext } from '../../App';
import Modal from '../Modal/Modal'; // ✅ Без .tsx

export default function Cart() {
  const { cart, removeFromCart, toggleCheck, setCart } =
    useContext(CartContext);
  const [modal, setModal] = useState(false);
  // const { setCart } = useContext(ProductsContext);
  // <button className="back-btn"></button>;

  const choseAll = () => {
    setCart((prevCart) => {
      const selectAll = prevCart.every((item) => item.isChecked);

      return prevCart.map((item) => ({
        ...item,
        isChecked: !selectAll,
      }));
    });
  };

  const deleteSelected = () => {
    setCart((item) => item.filter((i) => !i.isChecked));
  };

  return (
    <>
      <div className="cartw">
        <div className="links">
          <Link to={'/'}>
            <button className="back-btn"></button>
          </Link>
        </div>
        <div className="cart-menu">
          <div className="cart-left">
            <h1>Корзина</h1>
            <p>Всего товаров : {cart.length}</p>
          </div>
          <div className="cart-right">
            <div className="right-btn">
              <button className="choseAll" onClick={choseAll}>
                выбрать все {cart.length}
              </button>
              <button onClick={deleteSelected}>Удалить выбранные</button>
            </div>
          </div>
        </div>
        {cart.length === 0 ? (
          <h2 className="empty">Здесь будут ваши товары</h2>
        ) : (
          <div className="cart-layout">
            <div className="cart__list">
              {cart.map((item) => (
                <div className="oir">
                  <input
                    type="checkbox"
                    className="cart-checkbox"
                    checked={item.isChecked || false}
                    onChange={() =>
                      toggleCheck(item.id, item.selectedSize ?? null)
                    }
                  />
                  <div className="cart__card" key={item.id}>
                    <div className="card-i">
                      <Link to={`/item/${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="favorite-img"
                        />
                        <div className="favorite-info">
                          <h4 className="favorite-title-text">{item.title}</h4>
                          <p className="favorite-price">{item.price} ₽</p>

                          {/* 👇 Показываем размер, если он выбран */}
                          {item.selectedSize && (
                            <span className="favorite-size">
                              Размер: {item.selectedSize}
                            </span>
                          )}
                        </div>

                        <button
                          className="favorite-remove"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeFromCart(item.id, item.selectedSize ?? null);
                          }}
                          aria-label={`Удалить ${item.title} из избранного`}
                        >
                          ✕
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pay-block">
              <button onClick={() => setModal(true)} className="pay">
                <h5>Перейти к оформлению</h5>
              </button>
            </div>
            {modal && <Modal onClose={() => setModal(false)} cart={cart} />}
          </div>
        )}
      </div>
    </>
  );
}
