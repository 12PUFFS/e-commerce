import { Link, useParams } from 'react-router-dom';
import './ProductInfo.css';
import { useContext, useState, useEffect } from 'react';
import { CartContext, ProductsContext } from '../../App';
import type { Product } from '../../App';
import Header from '../Header/Header';
// import toHome from '../../images/toHome.png';
export default function ProductInfo() {
  const products = useContext(ProductsContext);
  const { id } = useParams();
  const product = products.find(
    (item: Product) => item.id === parseInt(id || '0'),
  );

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
  // const [selectedModel, setSelectedModel] = useState<number>(0);
  const [openItem, setOpenItem] = useState(false);
  const {
    addCart,
    currentSize,
    setCurrentSize,
    handleToFavorite,
    favorite,
    cart,
    // loading,
  } = useContext(CartContext);

  // ... остальные хуки

  // 🔥 Сбрасываем выбранный размер при загрузке новой страницы товара
  useEffect(() => {
    setCurrentSize(null); // ✅ Сбрасываем выбор
    setSelectedPhoto(0); // ✅ Сбрасываем фото на первое
  }, [id, setCurrentSize]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // 'auto' - мгновенно, 'smooth' - плавно
    });
  }, [id]);

  const isFavor = favorite.some(
    (i) => i.id === product.id && i.selectedSize === currentSize,
  );
  if (!product) {
    return <div>Товар не найден</div>;
  }

  // const back = () => {
  //   navigate(-1);
  // };

  // // 🔥 Выбираем первую фотографию при загрузке
  // if (!selectedPhoto && product.photos.length > 0) {
  //   setSelectedPhoto(product.photos[0]);
  // }

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

  // if (selectedPhoto > 0) {
  //   setSelectedPhoto(selectedPhoto.lenght - 1);
  // }

  const handlePrevPhoto = () => {
    if (!product.photos || product.photos.length === 0) return;
    if (selectedPhoto === 0) {
      // Если на первом фото - переходим к последнему
      setSelectedPhoto(product.photos.length - 1);
    } else {
      // Иначе - к предыдущему
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

  // Опционально: можно запрет

  const handleNextPhoto = () => {
    if (!product.photos || product.photos.length === 0) return;
    if (selectedPhoto === product.photos.length - 1) {
      // Если на последнем фото - переходим к первому
      setSelectedPhoto(0);
    } else {
      // Иначе - к следующему
      setSelectedPhoto(selectedPhoto + 1);
    }
  };

  const sameModel = products.filter((model) => {
    return model.models && model.models === product.models;
  });

  return (
    <>
      <Header />
      <div className="root-wrapper">
        <div className="container">
          <Link to={'/'}>
            <button className="back-btn">
              {/* <img src={toHome} alt="" /> */}
            </button>
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

                {/* <div className="desc-wrapper">
                <div className="full-desc">
                  <ul>
                    <div className="open-lock">
                      <p>Описание</p>
                      <button
                        onClick={() => setOpenItem(!openItem)}
                        className="open"
                        aria-label={
                          openItem ? 'Скрыть описание' : 'Показать описание'
                        }
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
                </div>
              </div> */}
              </div>

              <div className="full-info">
                <p className="cat">{product.category}</p>
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
                        // disabled={isInCart}
                      >
                        {size}
                        {/* {inFavorite && <span>♥</span>} */}
                      </button>
                    );
                  })}
                </ul>

                <div className="current-color">
                  <p>Цвет</p>
                  {/* <img
              className="current-color-img"
              src={product.variants}
              alt={`${product.title} - расцветка`}
            /> */}
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
                {/* <div className="cc">
                  {product.fulldesc?.map((text, index) => {
                    return <p key={index}>{text}</p>;
                  })}
                </div> */}
                <ul>
                  <div className="open-lock">
                    <p>Материалы</p>
                    <button
                      onClick={() => setOpenItem(!openItem)}
                      className="open"
                      aria-label={
                        openItem ? 'Скрыть описание' : 'Показать описание'
                      }
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
              </div>
            </div>
            <div className="inter">
              <div className="w">
                <h2 className="section-title">Могут понравиться</h2>
                <div className="all-sneakers-grid">
                  {sameModel.map((item) => (
                    <Link key={item.id} to={`/item/${item.id}`}>
                      <div className="sneaker-card">
                        <div className="sneaker-image">
                          <img
                            src={item.photos?.[0] || product.image}
                            alt={item.title}
                          />
                        </div>
                        <div className="sneaker-info">
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
