import { Link } from 'react-router-dom';

import './Cart.css';
import { useContext } from 'react';
import { CartContext } from '../../App'; // импортируйте ваш контекст

export default function Cart() {
  const { cart, currentSize } = useContext(CartContext);
  <button className="back-btn"></button>;
  return (
    <>
      <div className="cartw">
        <div className="links">
          <Link to={'/'}>
            <button className="back-btn"></button>
          </Link>
        </div>
        <h1>Корзина</h1>
        <p>Всего товаров : {cart.length}</p>
        {cart.length === 0 ? (
          <h2 className="empty">Здесь будут ваши товары</h2>
        ) : (
          <div className="cart-layout">
            <ul className="cart__list">
              {cart.map((item, index: number) => (
                <Link to={`/item/${item.id} `}>
                  <li className="cart__card" key={index}>
                    <img src={item.image} alt="" />
                    <p>{item.title}</p>
                  </li>
                </Link>
              ))}
            </ul>
            <div className="pay-block">
              <button className="pay">
                <h5>Перейти к оформлению</h5>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
