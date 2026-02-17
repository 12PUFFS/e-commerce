import { Link } from 'react-router-dom';
import { CartContext } from '../../App';
import { useContext } from 'react';

type LoadingProps = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

export default function Loading({ setActive, active }: LoadingProps) {
  const { newProductBanner } = useContext(CartContext);
  return (
    <>
      <div className="container">
        <div className="banner">
          <div className="banner-title">
            <h3>Легендарные модели</h3>
          </div>
          <div className="options">
            <div className="div-prev">
              <button>←</button>
            </div>
            <div className="div-next">
              <button>→</button>
            </div>
          </div>
          <Link to={`/item/${newProductBanner?.id || '1'}`}>
            <img
              src={newProductBanner?.image || ''}
              alt={newProductBanner?.title || ''}
            />
          </Link>
        </div>
        <div className="wrapper">
          <div className="filters">тут фильтры</div>
          <div className="list">
            <div className="indiv">
              <input type="text" placeholder="Что ищем?" />
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
            </div>
            <div className="loading">идёт загрука...</div>
          </div>
          <div className="price-filter">
            <select name="price" id="price-select">
              <option value="">Фильтры по цене</option>
              <option value="hight">Сначало дороже</option>
              <option value="low">Сначало дешевле</option>
            </select>
          </div>
        </div>
      </div>
      <footer className="footer">wwarwetrgth</footer>
    </>
  );
}
