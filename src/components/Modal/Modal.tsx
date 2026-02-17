// src/components/Modal/Modal.tsx
import { useContext } from 'react';
import { CartContext } from '../../App';
import './Modal.css';

export default function Modal() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-content">
          <div>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>Цена: {item.price} руб.</p>

                  {item.selectedSize && (
                    <p>
                      <strong>Размер: {item.selectedSize}</strong>
                    </p>
                  )}
                  <button onClick={() => removeFromCart(item.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
