// @ts-ignore
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';
import { ProductsContext, CartContext } from '../../App';
import Header from '../Header/Header';
import type { Product } from '../../App';
import FiltersContent from '../FiltersContent';

export default function ProductList() {
  const products = useContext(ProductsContext);
  const {
    loading,
    active,
    setActive,
    sortPrice,
    setSortPrice,
    selectedCategory,
    setSelectedCategory,
    selectedGender,
    setSelectedGender,
    selectedBrand,
    setSelectedBrand,
    categoryToggle,
    setCategoryToggle,
    genderToggle,
    setGenderToggle,
    brandToggle,
    setBrandToggle,
    categoryProductsNames,
    ActiveNames,
    categoryGenderNames,
    categoryBrandNames,
  } = useContext(CartContext);

  const [paginator, setPaginotor] = useState(12);
  const [hasAnyitems, setHasAnyItems] = useState(true);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [value, setValue] = useState('');
  const [showUpButton, setShowUpButton] = useState(false);

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

  const loadMore = () => {
    setPaginotor((prev) => prev + 15);
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
    if (displayBanners.length <= 1) return;
    const interval = setInterval(() => {
      setBannerIndex((prev) =>
        prev === displayBanners.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
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
          {/* Фильтры - слева */}
          <aside className="filters-sidebar">
            <FiltersContent
              active={active}
              setActive={setActive}
              sortPrice={sortPrice}
              setSortPrice={setSortPrice}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              categoryToggle={categoryToggle}
              setCategoryToggle={setCategoryToggle}
              genderToggle={genderToggle}
              setGenderToggle={setGenderToggle}
              brandToggle={brandToggle}
              setBrandToggle={setBrandToggle}
              ActiveNames={ActiveNames}
              categoryProductsNames={categoryProductsNames}
              categoryGenderNames={categoryGenderNames}
              categoryBrandNames={categoryBrandNames}
            />
          </aside>

          {/* Товары - справа */}
          <div className="products-area">
            <div className="search-bar">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="Поиск по названию..."
              />
            </div>
            <div className="active-tags">
              {active && (
                <p>
                  <p>
                    Коллекция -{' '}
                    {ActiveNames[active as keyof typeof categoryProductsNames]}
                  </p>

                  <span className="remove-tag" onClick={() => setActive('all')}>
                    ✕
                  </span>
                </p>
              )}

              {selectedCategory !== 'all' && (
                <p>
                  <p>
                    Тип товара -{' '}
                    {
                      categoryProductsNames[
                        selectedCategory as keyof typeof categoryProductsNames
                      ]
                    }
                  </p>
                  <span
                    className="remove-tag"
                    onClick={() => setSelectedCategory('all')}
                  >
                    ✕
                  </span>
                </p>
              )}
              {selectedGender !== 'all' && (
                <p>
                  <p>
                    Пол -{' '}
                    {
                      categoryGenderNames[
                        selectedGender as keyof typeof categoryGenderNames
                      ]
                    }
                  </p>
                  <span
                    className="remove-tag"
                    onClick={() => setSelectedGender('all')}
                  >
                    ✕
                  </span>
                </p>
              )}
              {selectedBrand !== 'all' && (
                <p>
                  <p>
                    Бренд -{' '}
                    {
                      categoryBrandNames[
                        selectedBrand as keyof typeof categoryBrandNames
                      ]
                    }
                  </p>
                  <span
                    className="remove-tag"
                    onClick={() => setSelectedBrand('all')}
                  >
                    ✕
                  </span>
                </p>
              )}
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
      <footer className="footer">Магазин одежды © 2026</footer>
    </>
  );
}
