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
  const [isHovered, setIshovered] = useState(false);
  const { handleToFavorite, favorite, cart, loading } = useContext(CartContext);
  // const [modal, setModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState<
    string | number | string | null
  >(null);
  const isLiked = favorite.some(
    (i) => i.id === product.id && i.selectedSize === selectedSize,
  );

  const displayedImage =
    isHovered && product.photos?.[1] ? product.photos?.[1] : product.image;

  const formattingPrice = (price: number) => {
    const strPrice = String(price);
    if (strPrice.length <= 3) {
      return strPrice;
    } else {
      return `${strPrice.slice(0, -3)} ${strPrice.slice(-3)}`;
    }
  };

  return (
    <>
      {loading ? (
        <div className="product-card skeleton">
          <div className="product-link">
            <div className="product-card-img skeleton-image">
              <img src={product.image} alt="" />
            </div>
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
              <img
                onMouseEnter={() => setIshovered(true)}
                onMouseLeave={() => setIshovered(false)}
                src={displayedImage}
                alt={product.title}
              />
            </div>
          </Link>
          <div className="product-card-info">
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="size-group">
                {product.availableSizes.slice(0, 4).map((size, index) => {
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
            <h2 className="product-card-price">
              {formattingPrice(parseInt(product.price.replace(/\s/g, '')))} ₽
            </h2>
            <h3 className="product-card-title">{product.title}</h3>
            <div className="gg">
              <p className="gender">{product.gender}</p>
              {/* <p className="status">{product.status}</p> */}
            </div>
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
