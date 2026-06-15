// import { useContext } from 'react';
// import { ProductsContext } from '../App';

// FiltersContent.tsx
interface FiltersContentProps {
  active: string;
  setActive: (value: string) => void;
  sortPrice: string;
  setSortPrice: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  categoryToggle: string;
  setCategoryToggle: (value: string) => void; // ← убрать функцию
  genderToggle: string;
  setGenderToggle: (value: string) => void; // ← убрать функцию
  brandToggle: string;
  setBrandToggle: (value: string) => void; // ← убрать функцию
  categoryProductsNames: Record<string, string>;
  categoryGenderNames: Record<string, string>;
  categoryBrandNames: Record<string, string>;
  ActiveNames: Record<string, string>; // ← добавить
}

export default function FiltersContent({
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
  categoryGenderNames,
  categoryBrandNames,
  // totalCount,
  ActiveNames,
}: FiltersContentProps) {
  return (
    <>
      {/* Статус */}
      <div className="filter-section">
        {/* <p>Всего товаров: {totalCount}</p> */}
        <div className="status-buttons">
          <button
            onClick={() => setActive('all')}
            className={`status-btn ${active === 'all' ? 'active' : ''}`}
          >
            {ActiveNames.all}
          </button>
          <button
            onClick={() => setActive('hits')}
            className={`status-btn ${active === 'hits' ? 'active' : ''}`}
          >
            {ActiveNames.hits}
          </button>
          <button
            onClick={() => setActive('new')}
            className={`status-btn ${active === 'new' ? 'active' : ''}`}
          >
            {ActiveNames.new}
          </button>
        </div>
      </div>

      {/* Сортировка по цене */}
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

      {/* Тип товара */}
      <div className="filter-section">
        <div className="type">
          <div
            onClick={() =>
              setCategoryToggle(
                categoryToggle === 'hidden' ? 'visible' : 'hidden',
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
            <li
              onClick={() => setSelectedCategory('hudi')}
              className={`category-item ${selectedCategory === 'hudi' ? 'active' : ''}`}
            >
              Худи
            </li>
          </ul>
        </div>
      </div>

      {/* Пол */}
      <div className="filter-section">
        <div className="cat-gender-type">
          <div
            onClick={() =>
              setGenderToggle(genderToggle === 'hidden' ? 'visible' : 'hidden')
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
      </div>

      {/* Бренд */}
      <div className="filter-section">
        <div className="cat-brand-type">
          <div
            onClick={() =>
              setBrandToggle(brandToggle === 'hidden' ? 'visible' : 'hidden')
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
    </>
  );
}
