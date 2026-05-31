// import Cart from '../Cart/Cart';
import './Header.css';
import heartIcon from '../../assets/heart.png';
import { useContext, useState } from 'react';
import { CartContext } from '../../App';
import cartIcon from '../../assets/Bag (1).svg';
import { Link } from 'react-router-dom';
import FiltersContent from '../FiltersContent';
// import logo from '../../../src/images/logo.png';

export default function Header() {
  const {
    cart,
    favorite,
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

  const [modalBurger, setModalBurger] = useState(false);

  const openBurger = () => {
    setModalBurger(true);
  };

  const closeBurger = () => {
    setModalBurger(false);
  };

  return (
    <>
      {/* Бургер-меню с фильтрами */}
      {modalBurger && (
        <div className="burger-wrapper">
          <div className="burger-overlay" onClick={closeBurger}></div>
          <div className="burger-filters">
            <div className="burger-content">
              <div className="burger-header">
                <h3>Фильтры</h3>
                <button className=" burger-close" onClick={closeBurger}>
                  <div className="burder-menu">
                    <div onClick={() => !openBurger} className="burger-block">
                      X
                    </div>
                  </div>
                </button>
              </div>
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
                categoryProductsNames={categoryProductsNames}
                categoryGenderNames={categoryGenderNames}
                categoryBrandNames={categoryBrandNames}
                ActiveNames={ActiveNames}
              />
            </div>
          </div>
        </div>
      )}

      <header className="header">
        <div className="burder-menu">
          <div onClick={openBurger} className="burger-block">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="menu">
          <ul className="list">
            <Link className="rr" to={'/heart'}>
              <p className="hearti-img">
                <img className="hearti" src={heartIcon} alt="" />
              </p>
              {favorite.length > 0 && (
                <span className="carti-count">{favorite.length}</span>
              )}
            </Link>
            <li>
              <Link to={'/cart'}>
                <div className="cartinochka">
                  <p className="cart">
                    <img className="heart" src={cartIcon} alt="" />
                  </p>
                </div>
                {cart.length > 0 && (
                  <span className="cart-count">{cart.length}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
