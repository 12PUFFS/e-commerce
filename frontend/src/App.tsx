import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList/ProductList';
import ProductInfo from './components/ProductInfo/ProductInfo';
import { createContext, useState, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Heart from './components/Heart/Heart';

export interface Product {
  id: number;
  title: string;
  category: string;
  gender: string;
  brand: string;
  price: string;
  image?: string;
  status?: 'new' | 'hit';
  photos?: string[];
  description?: string;
  desc?: string[];
  fulldesc?: string;
  selectedSize?: number | string | null;
  isChecked?: boolean;
  availableSizes?: number[];
  models?: string;
  variants?: string[];
}

interface SetCart {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  addCart: (id: number, size: number | string | null) => void;
  removeFromCart: (id: number, size: number | string | null) => void;
  deleteAllCart: () => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  currentSize: number | string | null;
  setCurrentSize: React.Dispatch<React.SetStateAction<number | string | null>>;
  newProductBanner: Product | undefined;
  toggleCheck: (id: number, size: number | string | null) => void;
  favorite: Product[];
  handleToFavorite: (id: number, size: number | string | null) => void;
  loading: boolean;
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
  favorite: [],
  handleToFavorite: () => {},
  loading: true,
});

export const ProductsContext = createContext<Product[]>([]);

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSize, setCurrentSize] = useState<number | string | null>(null);
  const [favorite, setFavorite] = useState<Product[]>([]);

  const handleToFavorite = (id: number, size: number | string | null) => {
    setFavorite((favor) => {
      const isFavor = favor.some(
        (item) => item.id === id && item.selectedSize === size,
      );

      if (isFavor) {
        return favor.filter((i) => i.id !== id || i.selectedSize !== size);
      } else {
        const toFavor = items.find((i) => i.id === id);
        return toFavor ? [...favor, { ...toFavor, selectedSize: size }] : favor;
      }
    });
  };

  // Загрузка товаров с сервера
  useEffect(() => {
    const API_BASE =
      import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
    fetch(`${API_BASE}/products/`)
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

  // ✅ Загрузка избранного из localStorage
  useEffect(() => {
    const savedFavorite = localStorage.getItem('favorite');
    if (savedFavorite) {
      try {
        setFavorite(JSON.parse(savedFavorite));
      } catch (e) {
        console.error('Ошибка загрузки избранного:', e);
      }
    }
  }, []);

  // ✅ Сохранение избранного в localStorage
  useEffect(() => {
    if (favorite && favorite.length > 0) {
      localStorage.setItem('favorite', JSON.stringify(favorite));
    } else {
      localStorage.removeItem('favorite');
    }
  }, [favorite]);

  // Загрузка корзины из localStorage
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

  // Сохранение корзины в localStorage
  useEffect(() => {
    if (cart && cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const addCart = (id: number, size: number | string | null) => {
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

  const toggleCheck = (id: number, size: number | string | null) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, isChecked: !item.isChecked }
          : item,
      ),
    );
  };

  const newProductBanner = items.find((i) => i.status === 'new');
  const removeFromCart = (id: number, sizeToRemove: number | string | null) => {
    setCart((prev) =>
      prev.filter((p) => p.id !== id || p.selectedSize !== sizeToRemove),
    );
  };

  const deleteAllCart = () => {
    setCart([]);
  };

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
          loading,
        }}
      >
        <HashRouter>
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
