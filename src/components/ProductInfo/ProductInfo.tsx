import { Link, useParams } from 'react-router-dom';
import products from '../../data';
import type { Product } from '../../data';

import './ProductInfo.css';
import { useContext, useState } from 'react';
import { CartContext } from '../../App';

export default function ProductInfo() {
  const { id } = useParams();
  const product = products.find(
    (item: Product) => item.id === parseInt(id || '0'),
  );

  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
  // const [selectedModel, setSelectedModel] = useState<number>(0);
  const [openItem, setOpenItem] = useState(false);
  const { addCart, currentSize, setCurrentSize } = useContext(CartContext);

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const handleAddToCart = () => {
    if (!currentSize) {
      alert('Выберите размер');
      return;
    }

    addCart(product.id);
  };

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
    if (selectedPhoto === 0) {
      setSelectedPhoto(product.photos.length - 1);
    } else {
      у;
      setSelectedPhoto(selectedPhoto - 1);
    }
  };

  const handleNextPhoto = () => {
    if (selectedPhoto === product.photos.length - 1) {
      setSelectedPhoto(0);
    } else {
      setSelectedPhoto(selectedPhoto + 1);
    }
  };

  const sameModel = products.filter((model) => {
    return model.models === product.models;
  });

  return (
    <>
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
                    {product.photos.slice(0, 5).map((photo, index: number) => {
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
                  <div className="o-title">
                    <h2>{product.title}</h2>
                  </div>
                  <img
                    src={product.photos[selectedPhoto]}
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

                  {product.desc.map((item, index: number) => {
                    return (
                      <li
                        className={`item ${openItem ? 'active' : 'hide'}`}
                        key={index}
                      >
                        - {item}
                      </li>
                    );
                  })}
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

                  {product.desc.map((item, index: number) => {
                    return (
                      <li
                        className={`item ${openItem ? 'active' : 'hide'}`}
                        key={index}
                      >
                        - {item}
                      </li>
                    );
                  })}

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

                  {product.desc.map((item, index: number) => {
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

            <div className="full-info">
              <h3>доступные размеры</h3>
              <ul className="current-size">
                {product.availableSizes.map((size, index: number) => {
                  return (
                    <button
                      onClick={() => setCurrentSize(size)}
                      className={`current-size-item ${
                        currentSize === size ? 'active' : ''
                      }`}
                      key={index}
                    >
                      {size}
                    </button>
                  );
                })}
              </ul>

              <div className="current-color">
                <p>текущая расцветка:</p>
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
                          onClick={() => {}}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="main-btn">
                <button
                  onClick={() => alert(`Ура, ты купил ${product.title}`)}
                  className="to-buy"
                >
                  Купить
                </button>

                <button onClick={handleAddToCart} className="to-cart">
                  В корзину
                  {currentSize && <p>Размер: {currentSize}</p>}
                </button>

                <div className="price">
                  <button>{product.price} ₽</button>
                </div>
              </div>
            </div>
          </div>

          <div className="inter">
            <div className="w">
              <h2 className="section-title">Все кроссовки</h2>
              <div className="all-sneakers-grid">
                {sameModel.map((item) => (
                  <Link key={item.id} to={`/item/${item.id}`}>
                    <div className="sneaker-card">
                      <div className="sneaker-image">
                        <img src={item.photos[0]} alt={item.title} />
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
    </>
  );
}
