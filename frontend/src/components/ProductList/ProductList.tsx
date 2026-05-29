// @ts-ignore
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';
import { ProductsContext, CartContext } from '../../App';
import Header from '../Header/Header';
import type { Product } from '../../App';
export default function ProductList() {
  const products = useContext(ProductsContext);
  const { loading } = useContext(CartContext);

  const [active, setActive] = useState('all');
  const [bannerIndex, setBannerIndex] = useState(0);
  const [value, setValue] = useState('');

  const filteredItems = products.filter((item) => {
    const filterByTag =
      active === 'all' ||
      (active === 'hits' && item.status === 'hit') ||
      (active === 'new' && item.status === 'new');

    const filterByinput = item.title
      .toLowerCase()
      .includes(value.toLowerCase());

    return filterByTag && filterByinput;
  });

  const bannerProducts = products.filter((i) => i.status === 'new');

  const displayBanners =
    bannerProducts.length > 0 ? bannerProducts : products.slice(0, 3);

  const currentBanner = displayBanners[bannerIndex];

  const handlePrevBanner = () => {
    if (displayBanners.length <= 1) return;
    setBannerIndex((prev) =>
      prev === 0 ? displayBanners.length - 1 : prev - 1,
    );
  };

  const handleNextBanner = () => {
    if (displayBanners.length <= 1) return;
    setBannerIndex((prev) =>
      prev === displayBanners.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    if (displayBanners.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setBannerIndex((prev) =>
        prev === displayBanners.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [displayBanners.length]);

  return (
    <>
      <Header />
      {loading ? (
        <div className="banner skeleton">
          <div className="wontainer">
            <div className="banner-content skeleton-content">
              <div className="title-desc">
                <div className="skeleton-title"></div>
                <div className="skeleton-price"></div>
              </div>
              {/* <div className="content-images">
                <div className="skeleton-image"></div>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        displayBanners.length > 0 &&
        currentBanner && (
          <div className="banner">
            <div className="wontainer">
              <div className="banner-content">
                <div className="title-desc">
                  {displayBanners.length > 1 && (
                    <div className="banner-counter">
                      {bannerIndex + 1} / {displayBanners.length}
                    </div>
                  )}
                  <h2>{currentBanner.title}</h2>
                  <p className="banner-price">{currentBanner.price} ₽</p>
                </div>

                {displayBanners.length > 1 && (
                  <div className="options">
                    <div className="div-prev">
                      <button onClick={handlePrevBanner}>←</button>
                    </div>
                    <div className="div-next">
                      <button onClick={handleNextBanner}>→</button>
                    </div>
                  </div>
                )}

                <div className="content-images">
                  <Link to={`/item/${currentBanner.id}`}>
                    <img
                      src={
                        currentBanner.image || currentBanner.photos?.[0] || ''
                      }
                      alt={currentBanner.title}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      <div className="container">
        <div className="wrapper">
          <div className="filters">
            <div className="filter_category">
              <ul className="category-list">
                <li className="category-item active">Все</li>
                <li className="category-item">Кроссовки</li>
                <li className="category-item">Куртки</li>
                <li className="category-item">Футболки</li>
                <li className="category-item">Джинсы</li>
              </ul>
            </div>
          </div>
          <div className="list">
            <div className="wee">
              <div className="indiv">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  placeholder="Что ищем?"
                />
                <p
                  onClick={() => setActive('all')}
                  className={`f ${active === 'all' ? 'active' : ''}`}
                >
                  все
                </p>
                <p
                  onClick={() => setActive('hits')}
                  className={`f ${active === 'hits' ? 'active' : ''}`}
                >
                  хиты
                </p>
                <p
                  onClick={() => setActive('new')}
                  className={`f ${active === 'new' ? 'active' : ''}`}
                >
                  новое
                </p>
                <div className="price-filter">
                  <select name="price" id="price-select">
                    <option value="">Фильтры по цене</option>
                    <option value="high">Сначала дороже</option>
                    <option value="low">Сначала дешевле</option>
                  </select>
                </div>
              </div>
              <div className="filter-counter">
                <div>
                  <p> Каталог товаров {filteredItems.length}</p>
                </div>
              </div>
            </div>

            <ul className="card-list">
              {loading ? (
                Array(20)
                  .fill(null)
                  .map((_, i) => (
                    <li key={i}>
                      <ProductCard product={{} as Product} />
                    </li>
                  ))
              ) : filteredItems.length === 0 ? (
                <div className="empty-list">нет результата</div>
              ) : (
                filteredItems.map((item) => (
                  <li key={item.id}>
                    <ProductCard product={item} />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
      <footer className="footer">Магазин кроссовок © 2025</footer>
    </>
  );
}
