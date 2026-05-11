import './ProductCard.css';
import type { Product } from '../../data';
// import { useContext } from 'react';
// import { CartContext } from '../../App';
import { Link } from 'react-router-dom';

import heartIcon from '../../assets/heart.png';

interface TypeOfProduct {
  product: Product;
  index: number;
}

export default function ProductCard({ product }: TypeOfProduct) {
  // const { addCart } = useContext(CartContext);

  return (
    <Link to={`/item/${product.id} `}>
      <div className="product-card">
        <div className="product-card-img">
          <img src={product.image} alt="" />

          {/* <button>Подробнее</button> */}
        </div>

        {/* <h4 className="rating">
          <img src={heartIcon} alt="" />
        </h4> */}

        <div className="product-card-info">
          <h2 className="product-card-price">{product.price} ₽</h2>
          <h3 className="product-card-title">{product.title}</h3>
        </div>
      </div>
    </Link>
  );
}
