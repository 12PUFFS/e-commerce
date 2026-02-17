// import Cart from '../Cart/Cart';
import './Header.css';
import heartIcon from '../../assets/heart.png';
import { useContext } from 'react';
import { CartContext } from '../../App';
import cartIcon from '../../assets/Bag (1).svg';
import { Link } from 'react-router-dom';

export default function Header() {
  const { cart } = useContext(CartContext);
  return (
    <>
      <div className="pre-header">Найди свою идеальную пару</div>
      <header className="header">
        <div className="menu">
          <ul className="list">
            <li className="hearti-img">
              <img className="hearti" src={heartIcon} alt="" />
            </li>
            <li>
              <Link to={'/cart'}>
                <div className="cartinochka">
                  <p className="cart">
                    <img className="heart" src={cartIcon} alt="" />
                  </p>
                </div>
                <span className="cart-count">{cart.length}</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
