import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import ProductInfo from './components/ProductInfo/ProductInfo';
import { createContext, useState, useEffect } from 'react';
import Cart from './components/Cart/Cart';

// Тип товара
interface Product {
  id: number;
  title: string;
  price: string;
  image?: string;
  status?: 'new' | 'hit';
  photos?: string[];
  description?: string;
  selectedSize?: number | null;
}

interface SetCart {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  addCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  deleteAllCart: () => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  currentSize: number | null;
  setCurrentSize: React.Dispatch<React.SetStateAction<number | null>>;
  newProductBanner: Product | undefined;
}

export const CartContext = createContext<SetCart>({
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
});

export const ProductsContext = createContext<Product[]>([]);

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSize, setCurrentSize] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
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

  // ✅ Загружаем корзину из localStorage при запуске
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ✅ Сохраняем корзину в localStorage при каждом изменении
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart'); // очищаем, если корзина пуста
    }
  }, [cart]);

  const addCart = (id: number) => {
    const product = items.find((i) => i.id === id); // ✅ ищем в items
    if (!product) return;

    const productWithSize = {
      ...product,
      selectedSize: currentSize,
    };
    setCart((prev: Product[]) => {
      if (!prev.find((item) => item.id === id)) {
        return [...prev, productWithSize];
      }
      return prev;
    });
  };

  const newProductBanner = items.find((i) => i.status === 'new'); // ✅ ищем в items

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
    if (cart.length === 1) {
      setModal(false);
    }
  };

  const deleteAllCart = () => {
    setCart([]);
    setModal(false);
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
          modal,
          currentSize,
          setCurrentSize,
          newProductBanner,
        }}
      >
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/item/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </HashRouter>
      </CartContext.Provider>
    </ProductsContext.Provider>
  );
}
