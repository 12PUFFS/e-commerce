// @ts-ignore
import { use, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';
import { ProductsContext, CartContext } from '../../App';
import Header from '../Header/Header';
import type { Product } from '../../App';

export default function ProductList() {
  const products = useContext(ProductsContext);
  const { loading } = useContext(CartContext);
  const [paginator, setPaginotor] = useState(12);
  const [hasAnyitems, setHasAnyItems] = useState(true);
  const [categoryToggle, setCategoryToggle] = useState('visible');
  const [active, setActive] = useState('all');
  const [bannerIndex, setBannerIndex] = useState(0);
  const [value, setValue] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [sortByGender] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [genderToggle, setGenderToggle] = useState('visible');
  const [showUpButton, setShowUpButton] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState('all');
  const [brandToggle, setBrandToggle] = useState('visible');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowUpButton(true);
      } else {
        setShowUpButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const filteredItems = products.filter((item) => {
    const filterByTag =
      active === 'all' ||
      (active === 'hits' && item.status === 'hit') ||
      (active === 'new' && item.status === 'new');

    const filterByinput = item.title
      .toLowerCase()
      .includes(value.toLowerCase());

    const filterByCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    const filterByGender =
      selectedGender === 'all' || item.gender === selectedGender;

    const filteredByBrand =
      selectedBrand === 'all' || item.brand === selectedBrand;

    return (
      filterByTag &&
      filterByinput &&
      filterByCategory &&
      filterByGender &&
      filteredByBrand
    );
  });

  // const getfilterByGender = () => {
  //   if (sortByGender === 'man') {
  //     return filteredItems.filter((item) => item.gender === 'man');
  //   }
  //   if (sortByGender === 'woman') {
  //     return filteredItems.filter((item) => item.gender === 'woman');
  //   }
  //   return filteredItems.filter(
  //     (item) => item.gender === 'man' || item.gender === 'woman',
  //   );
  // };

  // const sortedByGender = getfilterByGender();

  const getSortedItems = () => {
    const itemsCopy = [...filteredItems];

    if (sortPrice === 'high') {
      return itemsCopy.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\s/g, ''));
        const priceB = parseInt(b.price.replace(/\s/g, ''));
        return priceB - priceA;
      });
    }

    if (sortPrice === 'low') {
      return itemsCopy.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\s/g, ''));
        const priceB = parseInt(b.price.replace(/\s/g, ''));
        return priceA - priceB;
      });
    }

    return itemsCopy;
  };

  const sortedItems = getSortedItems();

  const visibleItems = sortedItems.slice(0, paginator);

  useEffect(() => {
    setHasAnyItems(visibleItems.length < sortedItems.length);
  }, [visibleItems, sortedItems.length]);

  useEffect(() => {}, [
    filteredItems,
    sortPrice,
    sortByGender,
    selectedCategory,
    active,
    value,
  ]);

  const loadMore = () => {
    setPaginotor((prev) => prev + 15);
  };

  const categoryProductsNames: Record<string, string> = {
    all: 'Все товары',
    shoes: 'Кроссовки',
    clothing: 'Куртки',
    Pant: 'Джинсы',
    'T-Shirt': 'Футболки',
  };

  const categoryGenderNames: Record<string, string> = {
    all: 'Все',
    man: 'Мужчинам',
    woman: 'Женщинам',
  };

  const categoryBrandNames: Record<string, string> = {
    all: 'Все',
    adidas: 'Adidas',
    nike: 'Nike',
    'the north face': 'The North Face',
    Carhartt: 'Carhartt',
  };

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
        <div className="content-wrapper">
          {/* Сайдбар с фильтрами */}
          <aside className="filters-sidebar">
            <h3>Фильтры</h3>
            <span className="count">Найдено: {sortedItems.length}</span>
            <div className="filter-section">
              {/* <h4>Статус</h4> */}
              <div className="status-buttons">
                <button
                  onClick={() => setActive('all')}
                  className={`status-btn ${active === 'all' ? 'active' : ''}`}
                >
                  Все
                </button>
                <button
                  onClick={() => setActive('hits')}
                  className={`status-btn ${active === 'hits' ? 'active' : ''}`}
                >
                  Хиты
                </button>
                <button
                  onClick={() => setActive('new')}
                  className={`status-btn ${active === 'new' ? 'active' : ''}`}
                >
                  Новинки
                </button>
              </div>
            </div>
            <div className="filter-section">
              <h4>Сортировка по цене</h4>
              <select
                onChange={(e) => setSortPrice(e.target.value)}
                className="price-select"
                value={sortPrice}
              >
                <option value="">По умолчанию</option>
                <option value="high">Сначала дороже</option>
                <option value="low">Сначала дешевле</option>
              </select>
            </div>

            <div className="filter-section">
              <div className="type">
                <div
                  onClick={() =>
                    setCategoryToggle((prev) =>
                      prev === 'hidden' ? 'visible' : 'hidden',
                    )
                  }
                  className="cat-type-heder"
                >
                  <h4>тип товара</h4>
                  <div className="current-type">
                    {categoryProductsNames[selectedCategory]}
                  </div>
                </div>
                <ul
                  className={`category-list ${categoryToggle === 'visible' ? 'active' : 'hidden'}`}
                >
                  <li
                    onClick={() => setSelectedCategory('all')}
                    className={`category-item ${selectedCategory === 'all' ? 'active' : ''}`}
                  >
                    Все
                  </li>
                  <li
                    onClick={() => setSelectedCategory('shoes')}
                    className={`category-item ${selectedCategory === 'shoes' ? 'active' : ''}`}
                  >
                    Кроссовки
                  </li>
                  <li
                    onClick={() => setSelectedCategory('clothing')}
                    className={`category-item ${selectedCategory === 'clothing' ? 'active' : ''}`}
                  >
                    Куртки
                  </li>
                  <li
                    onClick={() => setSelectedCategory('Pant')}
                    className={`category-item ${selectedCategory === 'Pant' ? 'active' : ''}`}
                  >
                    Джинсы
                  </li>
                  <li
                    onClick={() => setSelectedCategory('T-Shirt')}
                    className={`category-item ${selectedCategory === 'T-Shirt' ? 'active' : ''}`}
                  >
                    Футболки
                  </li>
                </ul>
              </div>
            </div>

            <div className="filter-section">
              <div className="cat-gender-type">
                <div
                  onClick={() =>
                    setGenderToggle((prev) =>
                      prev === 'hidden' ? 'visible' : 'hidden',
                    )
                  }
                  className="cat-gender-header"
                >
                  <h4>Пол</h4>
                  <div className="current-type">
                    {categoryGenderNames[selectedGender]}
                  </div>
                </div>
                <ul
                  className={`gender-list ${genderToggle === 'visible' ? 'active' : 'hidden'}`}
                >
                  <li
                    onClick={() => setSelectedGender('all')}
                    className={`gender-item ${selectedGender === 'all' ? 'active' : ''}`}
                  >
                    Все
                  </li>
                  <li
                    onClick={() => setSelectedGender('man')}
                    className={`gender-item ${selectedGender === 'man' ? 'active' : ''}`}
                  >
                    Мужчины
                  </li>
                  <li
                    onClick={() => setSelectedGender('woman')}
                    className={`gender-item ${selectedGender === 'woman' ? 'active' : ''}`}
                  >
                    Женщины
                  </li>
                </ul>
              </div>
              <div className="filter-section">
                <div className="cat-brand-type">
                  <div
                    onClick={() =>
                      setBrandToggle((prev) =>
                        prev === 'hidden' ? 'visible' : 'hidden',
                      )
                    }
                    className="cat-gender-header"
                  >
                    <h4>Бренд</h4>
                    <div className="current-type">
                      {categoryBrandNames[selectedBrand]}
                    </div>
                  </div>
                  <ul
                    className={`brand-list ${brandToggle === 'visible' ? 'active' : 'hidden'}`}
                  >
                    <li
                      onClick={() => setSelectedBrand('all')}
                      className={`brand-item ${selectedBrand === 'all' ? 'active' : ''}`}
                    >
                      Все
                    </li>
                    <li
                      onClick={() => setSelectedBrand('adidas')}
                      className={`brand-item ${selectedBrand === 'adidas' ? 'active' : ''}`}
                    >
                      Adidas
                    </li>
                    <li
                      onClick={() => setSelectedBrand('nike')}
                      className={`brand-item ${selectedBrand === 'nike' ? 'active' : ''}`}
                    >
                      Nike
                    </li>
                    <li
                      onClick={() => setSelectedBrand('the north face')}
                      className={`brand-item ${selectedBrand === 'the north face' ? 'active' : ''}`}
                    >
                      The North Face
                    </li>
                    <li
                      onClick={() => setSelectedBrand('Carhartt')}
                      className={`brand-item ${selectedBrand === 'Carhartt' ? 'active' : ''}`}
                    >
                      Carhartt
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* Основная область с товарами */}
          <div className="products-area">
            <div className="search-bar">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="Поиск по названию..."
              />
            </div>

            <ul className="card-list">
              {loading ? (
                Array(15)
                  .fill(null)
                  .map((_, i) => (
                    <li key={i}>
                      <ProductCard product={{} as Product} />
                    </li>
                  ))
              ) : sortedItems.length === 0 ? (
                <div className="empty-list">нет результата</div>
              ) : (
                visibleItems.map((item) => (
                  <li key={item.id}>
                    <ProductCard product={item} />
                  </li>
                ))
              )}
            </ul>
            {hasAnyitems && (
              <div className="load-more">
                <button onClick={loadMore}>
                  Загрузить еще {sortedItems.length - visibleItems.length}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showUpButton && (
        <button onClick={scrollToTop} className="scroll-to-top">
          Наверх
        </button>
      )}
      <footer className="footer">Магазин кроссовок © 2025</footer>
    </>
  );
}
