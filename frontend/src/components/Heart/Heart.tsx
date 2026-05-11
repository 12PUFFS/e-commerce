import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../App';

export default function Heart() {
  const { favorite } = useContext(CartContext);
  return (
    <div className="cartw">
      <Link to={'/'}>
        <button className="back-btn"></button>
      </Link>
      <div className="favorite">
        <div className="favorite-title">
          <h2>Вам понравились</h2>
          <p>Всего:</p>
        </div>
        <ul className="favorite-list">
          {favorite.map((i) => {
            return <li key={i.id}>{i.title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
