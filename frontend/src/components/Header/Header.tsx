// import Cart from '../Cart/Cart';
import './Header.css';
import heartIcon from '../../assets/heart.png';
import { useContext } from 'react';
import { CartContext } from '../../App';
import cartIcon from '../../assets/Bag (1).svg';
import { Link } from 'react-router-dom';
// import logo from '../../../src/images/logo.png';

export default function Header() {
  const { cart, favorite } = useContext(CartContext);
  return (
    <>
      <div className="pre-header">Найди свою идеальную пару</div>
      <header className="header">
        {/* <a href="">
          <img src={logo} alt="" />
        </a> */}
        <div className="menu">
          <ul className="list">
            <Link className="rr" to={'/heart'}>
              <p className="hearti-img">
                <img className="hearti" src={heartIcon} alt="" />
              </p>
              {favorite.length > 0 ? (
                <span className="cart-count">{favorite.length}</span>
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
