import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import ProductInfo from './components/ProductInfo/ProductInfo';
import { createContext, useState, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Heart from './components/Heart/Heart';

export interface Product {
  id: number;
  title: string;
  price: string;
  image?: string;
  status?: 'new' | 'hit';
  photos?: string[]; // Добавлено
  description?: string; // Добавлено
  desc?: string[]; // Добавлено (для списка особенностей)
  fulldesc?: string; // Добавлено (для текста о товаре)
  selectedSize?: number | null;
  isChecked?: boolean; // ИСПРАВЛЕНО: было isCheked
  availableSizes?: number[]; // Добавлено
  models?: string; // Добавлено (для фильтрации похожих)
  variants?: string[];
}

interface SetCart {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  addCart: (id: number, size: number | null) => void;
  removeFromCart: (id: number, size: number | null) => void;
  deleteAllCart: () => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  currentSize: number | null;
  setCurrentSize: React.Dispatch<React.SetStateAction<number | null>>;
  newProductBanner: Product | undefined;
  toggleCheck: (id: number, size: number | null) => void;
  favorite: Product[];
  handleToFavorite: (id: number) => void;
}

export const CartContext = createContext<SetCart>({
  toggleCheck: () => {},
  cart: [],
  setCart: () => {},
  addCart: () => {},
  removeFromCart: () => {},
  deleteAllCart: () => {},
  setModal: () => {},
  modal: false,
  currentSize: null,
  setCurrentSize: () => {},
  newProductBanner: undefined,
  favorite: [], // Заглушка
  handleToFavorite: () => {},
});

export const ProductsContext = createContext<Product[]>([]);

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSize, setCurrentSize] = useState<number | null>(null);
  const [favorite, setFavorite] = useState<Product[]>([]);

  const handleToFavorite = (id: number) => {
    setFavorite((favor) => {
      const isFavor = favor.some((item) => item.id === id);

      if (isFavor) {
        return favor.filter((i) => i.id !== id);
      } else {
        const toFavor = items.find((i) => i.id === id);
        return toFavor ? [...favor, toFavor] : favor;
      }
    });
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then((response) => response.json())
      .then((data) => {
        console.log('Данные с сервера:', data);
        setItems(data.products || data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки:', error);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   if (cart.length > 0) {
  //     localStorage.setItem('cart', JSON.stringify(cart));
  //   } else {
  //     localStorage.removeItem('cart');
  //   }
  // }, [cart]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('проблема -', e);
      }
    }
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const addCart = (id: number, size: number | null) => {
    // Если размер не передан — берём из стейта currentSize
    const finalSize = size ?? currentSize;

    const product = items.find((i) => i.id === id);
    if (!product) return;

    const productWithSize = {
      ...product,
      selectedSize: finalSize,
      isChecked: false,
    };

    setCart((prev: Product[]) => {
      const isExist = prev.some(
        (item) => item.id === id && item.selectedSize === finalSize,
      );
      if (!isExist) {
        return [...prev, productWithSize];
      }
      return prev;
    });

    setModal(true);
  };

  const toggleCheck = (id: number, size: number | null) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, isChecked: !item.isChecked }
          : item,
      ),
    );
  };

  const newProductBanner = items.find((i) => i.status === 'new');
  const removeFromCart = (id: number, sizeToRemove: number | null) => {
    setCart((prev) =>
      prev.filter((p) => p.id !== id || p.selectedSize !== sizeToRemove),
    );
  };

  const deleteAllCart = () => {
    setCart([]);
    // setModal(false);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <ProductsContext.Provider value={items}>
      <CartContext.Provider
        value={{
          cart,
          setCart,
          addCart,
          removeFromCart,
          deleteAllCart,
          setModal,
          favorite,
          toggleCheck,
          modal,
          currentSize,
          setCurrentSize,
          newProductBanner,
          handleToFavorite,
        }}
      >
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/item/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/heart" element={<Heart />} />
          </Routes>
        </HashRouter>
      </CartContext.Provider>
    </ProductsContext.Provider>
  );
}
