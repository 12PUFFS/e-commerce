import './ProductCard.css';
import type { Product } from '../../App';
import { useContext, useState } from 'react';
import { CartContext } from '../../App';
import { Link } from 'react-router-dom';

import heartIcon from '../../assets/heart.png';

// import Modal from '../Modal/Modal';

interface TypeOfProduct {
  product: Product;
}

export default function ProductCard({ product }: TypeOfProduct) {
  const { handleToFavorite, favorite, cart, loading } = useContext(CartContext);
  // const [modal, setModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const isLiked = favorite.some(
    (i) => i.id === product.id && i.selectedSize === selectedSize,
  );

  // const inCart = cart.some((i) => {
  //   return i.id === product.id && i.selectedSize === selectedSize;
  // });

  // useEffect(() => {
  //   const savedSize = localStorage.getItem(`item-${product.id}`);
  //   if (savedSize) {
  //     setSelectedSize(savedSize);
  //   }
  // }, [product.id]);

  // const handleSavedSize = (size: number)=> {
  //   setSelectedSize(size)
  //   localStorage.setItem(``)
  // }

  return (
    <>
      {loading ? (
        <div className="product-card skeleton">
          <div className="product-link">
            <div className="product-card-img skeleton-image"></div>
          </div>
          <div className="product-card-info">
            <div className="skeleton-sizes">
              <div className="skeleton-size"></div>
              <div className="skeleton-size"></div>
              <div className="skeleton-size"></div>
              <div className="skeleton-size"></div>
            </div>
            <div className="skeleton-price"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-heart"></div>
          </div>
        </div>
      ) : (
        <div className="product-card">
          <Link to={`/item/${product.id}`} className="product-link">
            <div className="product-card-img">
              <img src={product.image} alt={product.title} />
            </div>
          </Link>
          <div className="product-card-info">
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="size-group">
                {product.availableSizes.map((size, index) => {
                  const IsCurrentSize = selectedSize === size;
                  const isInFavorite = favorite.some(
                    (i) => i.id === product.id && i.selectedSize === size,
                  );
                  const inCart = cart.some((i) => {
                    return i.id === product.id && i.selectedSize === size;
                  });
                  const isActive = IsCurrentSize || isInFavorite;
                  return (
                    <span
                      key={`${product.id}-${size}-${index}`}
                      className={`size-tag ${isInFavorite ? 'in-favorite' : ''} ${inCart ? 'in-cart' : ''} ${isActive ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </span>
                  );
                })}
              </div>
            )}
            <h2 className="product-card-price">{product.price} ₽</h2>
            <h3 className="product-card-title">{product.title}</h3>
            <button
              className={`rating ${isLiked ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!selectedSize) {
                  alert('Выберите размер');
                  return;
                }
                handleToFavorite(product.id, selectedSize);
              }}
              aria-label="Добавить в избранное"
              disabled={!selectedSize}
            >
              <img src={heartIcon} alt="" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
