// @ts-ignore
// import { useContext } from 'react';
// import { CartContext } from '../../App';
import { Link } from 'react-router-dom';
import './Modal.css';
import type { Product } from '../../App';

interface ModalType {
  cart: Product[];
  onClose: () => void;
}

export default function Modal({ cart, onClose }: ModalType) {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-content">
          <div>
            {cart.filter((item) => item.isChecked).length > 0 ? (
              cart
                .filter((item) => item.isChecked)
                .map((item) => (
                  <Link to={`/item/${item.id}`}>
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
                      </div>
                    </div>
                  </Link>
                ))
            ) : (
              <p>Выбери товар</p>
            )}
          </div>
          <h1>hi</h1>
          <button onClick={onClose}>close</button>
        </div>
      </div>
    </div>
  );
}

{
  /* <div key={item.id} className="cart-item">
   <img src={item.image} alt={item.title} />
   <div>
     <h4>{item.title}</h4>
    <p>Цена: {item.price} руб.</p>

     {item.selectedSize && (
      <p>
        <strong>Размер: {item.selectedSize}</strong>
      </p>
    )}
  </div>
</div> */
}
