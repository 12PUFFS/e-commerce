// import Cart from '../Cart/Cart';
import './Header.css';
import heartIcon from '../../assets/heart.png';
import { useContext, useState } from 'react';
import { CartContext } from '../../App';
import cartIcon from '../../assets/Bag (1).svg';
import { Link } from 'react-router-dom';
// import logo from '../../../src/images/logo.png';

export default function Header() {
  const { cart, favorite } = useContext(CartContext);

  const [modalBurger, setModalBurger] = useState(false);

  return (
    <>
      {/* <div className="pre-header">Найди свою идеальную пару</div> */}
      {modalBurger && (
        <div className="burger-wrapper">
          <div className="buger-content">
            <aside className="filters-sidebar">
              <h3>Фильтры</h3>
              <div className="burger-header">
                <span className="count">Найдено:</span>
                <div onClick={() => setModalBurger(false)}>X</div>
              </div>

              {/* Статус */}
              <div className="filter-section">
                <div className="status-buttons">
                  <button className="status-btn active">Все</button>
                  <button className="status-btn">Хиты</button>
                  <button className="status-btn">Новинки</button>
                </div>
              </div>

              {/* Сортировка по цене */}
              <div className="filter-section">
                <h4>Сортировка по цене</h4>
                <select className="price-select">
                  <option value="">По умолчанию</option>
                  <option value="high">Сначала дороже</option>
                  <option value="low">Сначала дешевле</option>
                </select>
              </div>

              {/* Тип товара */}
              <div className="filter-section">
                <div className="type">
                  <div className="cat-type-heder">
                    <h4>тип товара</h4>
                    <div className="current-type">Все товары</div>
                  </div>
                  <ul className="category-list active">
                    <li className="category-item active">Все</li>
                    <li className="category-item">Кроссовки</li>
                    <li className="category-item">Куртки</li>
                    <li className="category-item">Джинсы</li>
                    <li className="category-item">Футболки</li>
                  </ul>
                </div>
              </div>

              {/* Пол */}
              <div className="filter-section">
                <div className="cat-gender-type">
                  <div className="cat-gender-header">
                    <h4>Пол</h4>
                    <div className="current-type">Все</div>
                  </div>
                  <ul className="gender-list active">
                    <li className="gender-item active">Все</li>
                    <li className="gender-item">Мужчины</li>
                    <li className="gender-item">Женщины</li>
                  </ul>
                </div>
              </div>

              {/* Бренд */}
              <div className="filter-section">
                <div className="cat-brand-type">
                  <div className="cat-gender-header">
                    <h4>Бренд</h4>
                    <div className="current-type">Все</div>
                  </div>
                  <ul className="brand-list active">
                    <li className="brand-item active">Все</li>
                    <li className="brand-item">Adidas</li>
                    <li className="brand-item">Nike</li>
                    <li className="brand-item">The North Face</li>
                    <li className="brand-item">Carhartt</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
      <header className="header">
        {/* <a href="">
          <img src={logo} alt="" />
        </a> */}
        <div className="burder-menu">
          <div onClick={() => setModalBurger(true)} className="burger-block">
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
              {favorite.length > 0 ? (
                <span className="carti-count">{favorite.length}</span>
              ) : (
                ''
              )}
            </Link>
            <li>
              <Link to={'/cart'}>
                <div className="cartinochka">
                  <p className="cart">
                    <img className="heart" src={cartIcon} alt="" />
                  </p>
                </div>
                {cart.length > 0 ? (
                  <span className="cart-count">{cart.length}</span>
                ) : (
                  ''
                )}
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
