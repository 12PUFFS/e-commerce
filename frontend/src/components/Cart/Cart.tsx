import { Link } from 'react-router-dom';

import './Cart.css';
import { useContext, useState } from 'react';
import { CartContext } from '../../App';
import Modal from '../Modal/Modal'; // ✅ Без .tsx
import Header from '../Header/Header';

export default function Cart() {
  const { cart, removeFromCart, toggleCheck, setCart } =
    useContext(CartContext);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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

  const checkedItems = cart.filter((item) => item.isChecked);
  const total = checkedItems.reduce(
    (sum, item) => sum + parseInt(item.price.replace(/\s/g, '')),
    0,
  );

  function DeleteSelectedModal() {
    return (
      <div className="delete-wrapper">
        <div className="delete-window">
          <div className="window-title">
            Удалить выбранные товары?
            {/* <span className="number-delete">{cart.length}</span> */}
          </div>
          <div className="buttons">
            <button
              className="button-cancel"
              onClick={() => setDeleteModal(false)}
            >
              отмена
            </button>
            <button
              className="button-delete"
              onClick={() => {
                (deleteSelected(), setDeleteModal(false));
              }}
            >
              удалить
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {deleteModal && <DeleteSelectedModal />}
      <Header />
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
          {cart.length > 0 ? (
            <div className="cart-right">
              <div className="right-btn">
                <div className="rerer">
                  <button className="choseAll" onClick={choseAll}>
                    выбрать все
                  </button>
                  <div>Выбрано {cart.filter((i) => i.isChecked).length}</div>
                </div>
              </div>
              <div
                className={`delete-all ${checkedItems.length > 0 ? '' : 'delete-all-hidden'}`}
              >
                <button
                  onClick={() => {
                    if (checkedItems.length > 0) {
                      setDeleteModal(true);
                    }
                    return;
                  }}
                >
                  Удалить выбранные
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
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
                    <div
                      className={`card-i ${item.isChecked ? 'checked' : ''}`}
                    >
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
              {checkedItems.length > 0 ? (
                <div className="summary">
                  <div> Общая сумма</div>
                  <div>{`${total} руб.`}</div>
                </div>
              ) : (
                ''
              )}
            </div>
            {modal && <Modal onClose={() => setModal(false)} cart={cart} />}
          </div>
        )}
      </div>
    </>
  );
}
