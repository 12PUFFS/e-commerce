interface Props {
  setActive: (active: string) => void;
  active: string;
}

export default function EmptyProductList({ setActive, active }: Props) {
  return (
    <div className="wrapper container">
      <div className="filters">тут фильтры</div>
      <div className="list">
        <div className="indiv">
          <input type="text" placeholder="Что ищем?" />
          <buttom
            key="all"
            onClick={() => setActive('all')}
            className={`f ${active === 'all' ? 'active' : ''}`}
          >
            все
          </buttom>
          <buttom
            key="hits"
            onClick={() => setActive('hits')}
            className={`f ${active === 'hits' ? 'active' : ''}`}
          >
            хиты
          </buttom>
          <buttom
            key="new"
            onClick={() => setActive('new')}
            className={`f ${active === 'new' ? 'active' : ''}`}
          >
            новое
          </buttom>
        </div>
        <div className="empty">сории список пустой</div>
      </div>
    </div>
  );
}
