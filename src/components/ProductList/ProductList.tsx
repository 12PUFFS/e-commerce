import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';
import products from '../../data';
import type { Product } from '../../data';
import Loading from '../Loading/Loading';
import EmptyProductList from './EmptyProductList';

export default function ProductList() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('all');
  // const [searchValue, setSearchValue] = useState('');
  const [bannerIndex, setBannerIndex] = useState(0);
  // const [status, setStatus] = useState('all');

  // Первый useEffect - всегда выполняется
  useEffect(() => {
    setTimeout(() => {
      setItems(products);
      setLoading(false);
    }, 500);
  }, []);

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchValue(e.target.value);
  // };

  // const filteredItems = items.filter((item) => {
  //   return (
  //     item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
  //     item.description.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  // });

  // const changeStatus = (newStatus) => {
  //   setActive(newStatus); // передаем значение
  //   setStatus(newStatus); // передаем значение
  // };

  // Баннеры - все товары со статусом 'new'
  const bannerProducts = products.filter((i) => i.status === 'new');

  // Если нет новых товаров, берем первые 3
  const displayBanners =
    bannerProducts.length > 0 ? bannerProducts : products.slice(0, 3);

  // Текущий баннер для показа
  const currentBanner = displayBanners[bannerIndex];

  // Навигация по баннерам
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

  // Второй useEffect - всегда выполняется
  useEffect(() => {
    // Если баннеров 1 или меньше, не запускаем интервал
    if (displayBanners.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setBannerIndex((prev) =>
        prev === displayBanners.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    // Функция очистки - всегда выполняется
    return () => {
      clearInterval(interval);
    };
  }, [displayBanners.length]); // Зависимости

  if (loading) {
    return <Loading setActive={setActive} active={active} />;
  }

  if (items.length === 0) {
    return <EmptyProductList setActive={setActive} active={active} />;
  }

  return (
    <>
      {displayBanners.length > 0 && currentBanner && (
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
              {/* <div className="banner-title">
          <h3>Новинки</h3>
        </div> */}

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
                    src={currentBanner.image || currentBanner.photos?.[0] || ''}
                    alt={currentBanner.title}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="wrapper">
          <div className="filters">тут фильтры</div>
          <div className="list">
            <div className="indiv">
              <input
                // onChange={handleSearch}
                type="text"
                placeholder="Что ищем?"
                // value={searchValue}
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

            <ul className="card-list">
              {items.map((item, index: number) => (
                <li key={item.id}>
                  <ProductCard product={item} index={index} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <footer className="footer">Магазин кроссовок © 2025</footer>
    </>
  );
}
