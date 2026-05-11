import { Link } from 'react-router-dom';

import './Cart.css';
import { useContext } from 'react';
import { CartContext } from '../../App';

export default function Cart() {
  const { cart, removeFromCart, toggleCheck, setCart } =
    useContext(CartContext);
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
            <p>
              выбрано товаров: {cart.filter((item) => item.isChecked).length}
            </p>
            <button className="choseAll" onClick={choseAll}>
              выбрать все {cart.length}
            </button>
            <button onClick={() => deleteSelected(cart.id)}>
              Удалить выбранные
            </button>
          </div>
        </div>
        {cart.length === 0 ? (
          <h2 className="empty">Здесь будут ваши товары</h2>
        ) : (
          <div className="cart-layout">
            <div className="cart__list">
              {cart.map((item) => (
                <div className="cart__card" key={item.id}>
                  <input
                    type="checkbox"
                    className="cart-checkbox"
                    checked={item.isChecked || false}
                    onChange={() => toggleCheck(item.id, item.selectedSize)}
                  />
                  <div>
                    <Link to={`/item/${item.id}`}>
                      <img src={item.image} alt="" />
                    </Link>
                    <p>{item.title}</p>
                    <p>{item.selectedSize}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFromCart(item.id, item.selectedSize);
                      }}
                    >
                      удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
