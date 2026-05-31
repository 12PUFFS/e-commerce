import { Link, useParams } from 'react-router-dom';
import './ProductInfo.css';
import { useContext, useState, useEffect } from 'react';
import { CartContext, ProductsContext } from '../../App';
import type { Product } from '../../App';
import Header from '../Header/Header';

export default function ProductInfo() {
  // ========== 1. ВСЕ ХУКИ В САМОМ НАЧАЛЕ ==========
  const products = useContext(ProductsContext);
  const { id } = useParams();

  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
  const [openItem, setOpenItem] = useState(false);
  const {
    addCart,
    currentSize,
    setCurrentSize,
    handleToFavorite,
    favorite,
    cart,
  } = useContext(CartContext);

  // useEffect ДО раннего return
  useEffect(() => {
    setCurrentSize(null);
    setSelectedPhoto(0);
  }, [id, setCurrentSize]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [id]);

  // ========== 2. ПОТОМ ЛОГИКА ==========
  const product = products.find(
    (item: Product) => item.id === parseInt(id || '0'),
  );

  // ========== 3. РАННИЙ RETURN ==========
  if (!product) {
    return <div>Товар не найден</div>;
  }

  if (!product.photos) {
    return (
      <div className="container">
        <Link to={'/'}>
          <button className="back-btn">назад</button>
        </Link>
        <h1 className="_error">404</h1>
      </div>
    );
  }

  // ========== 4. ОСТАЛЬНАЯ ЛОГИКА ==========
  const isFavor = favorite.some(
    (i) => i.id === product.id && i.selectedSize === currentSize,
  );

  const handlePrevPhoto = () => {
    if (!product.photos || product.photos.length === 0) return;
    if (selectedPhoto === 0) {
      setSelectedPhoto(product.photos.length - 1);
    } else {
      setSelectedPhoto(selectedPhoto - 1);
    }
  };

  const sizesInCart = cart
    .filter((item) => item.id === product.id)
    .map((item) => item.selectedSize);

  const handleAddToCart = () => {
    if (!currentSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }

    if (sizesInCart.includes(currentSize)) {
      alert('Этот размер уже в корзине!');
      return;
    }

    addCart(product.id, currentSize);
    setCurrentSize(null);
  };

  const handleNextPhoto = () => {
    if (!product.photos || product.photos.length === 0) return;
    if (selectedPhoto === product.photos.length - 1) {
      setSelectedPhoto(0);
    } else {
      setSelectedPhoto(selectedPhoto + 1);
    }
  };

  const sameModel = products.filter((model) => {
    return model.models && model.models === product.models;
  });

  const getRecomended = () => {
    const category = products.filter(
      (item) =>
        item.category !== product.category &&
        item.gender === product.gender &&
        item.id !== product.id,
    );
    return category;
  };

  const recomended = getRecomended();

  // ========== 5. JSX ==========
  return (
    <>
      <Header />
      <div className="root-wrapper">
        <div className="container">
          <Link to={'/'}>
            <button className="back-btn"></button>
          </Link>

          <div className="content">
            <div className="info-wrapper">
              <div className="main-content">
                <div className="main">
                  <div className="photo">
                    <ul>
                      {product.photos.map((photo, index: number) => {
                        return (
                          <li
                            className={`${
                              index === selectedPhoto ? 'active' : ''
                            }`}
                            key={index}
                          >
                            <img
                              onClick={() => setSelectedPhoto(index)}
                              src={photo}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="o">
                    <img
                      src={product.photos?.[selectedPhoto]}
                      alt={`${product.title} - основное изображение`}
                    />
                    <div className="options">
                      <div className="div-prev">
                        <button onClick={handlePrevPhoto} className="prev">
                          ←
                        </button>
                      </div>
                      <div className="div-next">
                        <button onClick={handleNextPhoto} className="next">
                          →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="full-info">
                {/* ✅ Исправлено: div вместо p */}
                <div className="cat">
                  <span>{product.category}</span>
                  <span>{product.gender}</span>
                </div>
                <h1>{product.title}</h1>
                <h3>доступные размеры</h3>
                <ul className="current-size">
                  {product.availableSizes?.map((size) => {
                    const isCurrentlySelected = currentSize === size;
                    const isInCart = sizesInCart.includes(size);
                    const inFavorite = favorite.some(
                      (item) =>
                        item.id === product.id && item.selectedSize === size,
                    );
                    const isActive = isCurrentlySelected;
                    return (
                      <button
                        onClick={() => setCurrentSize(size)}
                        className={`current-size-item ${
                          isActive ? 'active' : ''
                        } ${isInCart ? 'selected-bg' : ''} ${inFavorite ? 'infavor' : ''}`}
                        key={size}
                      >
                        {size}
                      </button>
                    );
                  })}
                </ul>

                <div className="current-color">
                  <p>Цвет</p>
                  <div className="variants">
                    {sameModel.map((variant, index: number) => {
                      const getVariant = product.id === variant.id;
                      return (
                        <Link key={index} to={`/item/${variant.id}`}>
                          <img
                            className={`current-color-img ${
                              getVariant ? 'active' : ''
                            }`}
                            src={variant.image}
                            alt=""
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="main-btn">
                  <div className="price">
                    <button>{product.price} ₽</button>
                  </div>
                  <button onClick={handleAddToCart} className="to-cart">
                    В корзину
                    {currentSize && <p>Размер: {currentSize}</p>}
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!currentSize) {
                        alert('Выберите размер');
                        return;
                      }
                      handleToFavorite(product.id, currentSize);
                    }}
                    className={`to_favorite ${isFavor ? 'active' : ''}`}
                  >
                    {isFavor ? 'Удалить из избранного' : 'Добавить в избранное'}
                  </button>
                </div>
              </div>
            </div>

            <div className="desc-wrapper">
              <div className="full-desc">
                <ul>
                  <div className="open-lock">
                    <p>Особенности</p>
                    <button
                      onClick={() => setOpenItem(!openItem)}
                      className="open"
                    >
                      {openItem ? '−' : '+'}
                    </button>
                  </div>
                  {product.desc?.map((item, index) => {
                    return (
                      <li
                        className={`item ${openItem ? 'active' : 'hide'}`}
                        key={index}
                      >
                        - {item}
                      </li>
                    );
                  })}
                </ul>
                <div>
                  <p>{product.fulldesc}</p>
                </div>
              </div>
            </div>

            <div className="inter">
              <div className="w">
                <h2 className="section-title">Могут понравиться</h2>
                <div className="all-sneakers-grid">
                  {recomended.map((item) => (
                    <Link key={item.id} to={`/item/${item.id}`}>
                      <div className="sneaker-card">
                        <div className="sneaker-image">
                          <img
                            src={item.photos?.[0] || product.image}
                            alt={item.title}
                          />
                        </div>
                        <div className="sneaker-info">
                          {/* ✅ Исправлено */}
                          <div className="cat">
                            <span>{item.gender}</span>
                          </div>
                          <h3 className="sneaker-title">{item.title}</h3>
                          <p className="sneaker-description">
                            {item.description}
                          </p>
                          <div className="sneaker-price">{item.price} ₽</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">Магазин кроссовок © 2025</footer>
      </div>
    </>
  );
}
