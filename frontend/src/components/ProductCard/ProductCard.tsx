import './ProductCard.css';
import type { Product } from '../../data';
import { useContext, useState } from 'react';
import { CartContext } from '../../App';
import { Link } from 'react-router-dom';

import heartIcon from '../../assets/heart.png';

interface TypeOfProduct {
  product: Product;
}

export default function ProductCard({ product }: TypeOfProduct) {
  const { handleToFavorite, favorite } = useContext(CartContext);

  // const [activeFavor, setActiveFavor] = useState('');

  // const handleLikeClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   handleToFavorite(product.id);
  // };

  const isLiked = favorite.some((i) => i.id === product.id);

  return (
    <div className="product-card">
      {/* Ссылка только на изображение и текст */}
      <Link to={`/item/${product.id}`} className="product-link">
        <div className="product-card-img">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-card-info">
          <h2 className="product-card-price">{product.price} ₽</h2>
          <h3 className="product-card-title">{product.title}</h3>
        </div>
      </Link>

      {/* Кнопка лайка ОТДЕЛЬНО. Используем button для семантики */}
      <button
        className={`rating ${isLiked ? 'active' : ''}`}
        onClick={() => handleToFavorite(product.id)}
        aria-label="Добавить в избранное"
      >
        <img src={heartIcon} alt="" />
      </button>
    </div>
  );
}
