import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../App';
import './Heart.css'; // 👈 Не забудь создать стили

export default function Heart() {
  const { favorite, handleToFavorite } = useContext(CartContext);

  return (
    <div className="cartw">
      <Link to={'/'}>
        <button className="back-btn" aria-label="Назад"></button>
      </Link>

      <div className="favorite">
        <div className="favorite-title">
          <h1>Вам понравились</h1>
          <p>Всего: {favorite.length}</p>
        </div>

        {favorite.length === 0 ? (
          <h2 className="empty-favorite">Список избранного пуст</h2>
        ) : (
          <ul className="favorite-list">
            {favorite.map((item) => {
              // 👇 Уникальный ключ: комбинация id + размер
              const uniqueKey = `${item.id}-${item.selectedSize ?? 'no-size'}`;

              return (
                <li key={uniqueKey} className="favorite-item">
                  <div className="favor-list">
                    <Link to={`/item/${item.id}`} className="favorite-link">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="favorite-img"
                      />
                      <div className="favorite-info">
                        <h4 className="favorite-title-text">{item.title}</h4>
                        <p className="favorite-price">{item.price} ₽</p>

                        {/* 👇 Показываем размер, если он выбран */}
                        {item.selectedSize && (
                          <span className="favorite-size">
                            Размер: {item.selectedSize}
                          </span>
                        )}
                      </div>

                      {/* 👇 Кнопка удаления с правильным selectedSize */}
                      <button
                        className="favorite-remove"
                        onClick={() =>
                          handleToFavorite(item.id, item.selectedSize ?? null)
                        }
                        aria-label={`Удалить ${item.title} из избранного`}
                      >
                        ✕
                      </button>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
