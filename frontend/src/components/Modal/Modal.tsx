// @ts-ignore
// import { useContext } from 'react';
// import { CartContext } from '../../App';
import { Link } from 'react-router-dom';
import './Modal.css';
import type { Product } from '../../App';
import { useState, useRef } from 'react';

interface ModalType {
  cart: Product[];
  onClose: () => void;
  onSubmit?: (data: CheckoutData) => void;
}

interface CardData {
  number: string;
  expiry: string;
  cvv: string;
}

interface CardType {
  value: CardData;
  onChange: (newValue: CardData) => void;
}

export function CardPay({ value, onChange }: CardType) {
  // const [cardValue, setCardValue] = useState('');
  // const [dateValue, setDateValue] = useState('');
  // const [cvvValue, setCvvValue] = useState('');

  const expiryRef = useRef<HTMLInputElement>(null);
  const cvvRef = useRef<HTMLInputElement>(null);

  const formatCardNumber = (input: string) => {
    const onlyDigit = input.replace(/\D/g, '');
    const trimmed = onlyDigit.slice(0, 16);
    const spases = trimmed.replace(/(\d{4})/g, '$1 ').trim();

    return spases.trim();
  };

  const formattedDate = (input: string) => {
    // 1. Только цифры, максимум 4
    const digits = input.replace(/\D/g, '').slice(0, 4);
    if (!digits) return '';

    // 2. Если введена 1 цифра от 1 до 9 → подставляем 0
    if (digits.length === 1 && digits >= '1' && digits <= '9') {
      return `0${digits}`;
    }

    // 3. Если 2 цифры (месяц сформирован)
    if (digits.length === 2) {
      // 01-09 уже с нулём, 10-12 остаются без изменений
      return digits;
    }

    // 4. Если 3 или 4 цифры → добавляем слэш ММ/ГГ
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const formatted = formattedDate(e.target.value);
    onChange({ ...value, expiry: formatted });

    if (raw.length === 4) {
      cvvRef.current?.focus();
    }
  };

  const formattedCvv = (input: string) => {
    const onlyDigit = input.replace(/\D/g, '');
    const trimmed = onlyDigit.slice(0, 3);
    return trimmed;
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const formatted = formatCardNumber(e.target.value);
    onChange({ ...value, number: formatted });

    if (raw.length === 16) {
      expiryRef.current?.focus();
    }
  };

  const handleCvvInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formattedCvv(e.target.value);
    onChange({ ...value, cvv: formatted });
  };

  return (
    <>
      <div className="warning">
        <p>Введите вашу карту</p>
      </div>
      <div className="card-wrapper">
        <div className="line-card"></div>
        <div className="card-numbers">
          <div className="input-wrapper">
            <input
              className="card-input"
              onChange={handleNumberInput}
              value={value.number}
              type="text"
              inputMode="numeric"
              pattern="\d*"
            />
            <span
              className={`placeholder-guide ${value.number ? 'is-hidden' : ''}`}
            >
              0000 0000 0000 0000
            </span>
          </div>
          <div className="date-cvv">
            <div className="date">
              <p className="date-desc">Срок</p>
              <input
                className="card-input-date"
                value={value.expiry}
                placeholder="00/00"
                ref={expiryRef}
                onChange={handleDateInput}
                type="text"
                inputMode="numeric"
              />
            </div>
            <div className="cvv">
              <p className="cvv-desc">CVV</p>
              <input
                ref={cvvRef}
                className="card-input-cvv"
                value={value.cvv}
                placeholder="000"
                onChange={handleCvvInput}
                type="text"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface CheckoutData {
  email: string;
  name: string;
  phone: string;
  address: string;
  delivery: 'courier' | 'pickup' | 'post';
  payment: 'card' | 'cash' | 'online';
  comment?: string;
  items: Array<{ id: number; size: number | null; price: string }>;
  total: string;
  card?: {
    number: string;
    expiry: string;
    cvv: string;
  };
}

type ErrorsType = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export default function Modal({ cart, onClose, onSubmit }: ModalType) {
  const [cardPay, setCardPay] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });
  const [name, setCorrrectName] = useState('');
  const [email, setCorrectEmail] = useState('');
  const [phone, setCorrectPhone] = useState('');
  const [active, setActive] = useState('courier');
  const [activePay, setActivePay] = useState('card');
  const [error, setError] = useState<ErrorsType>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const checkedItems = cart.filter((item) => item.isChecked);
  const total = checkedItems.reduce(
    (sum, item) => sum + parseInt(item.price.replace(/\s/g, '')),
    0,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const phoneData = (formData.get('phone') as string)?.trim() ?? '';
    const nameData = (formData.get('name') as string)?.trim() ?? '';
    const emailData = (formData.get('email') as string)?.trim() ?? '';

    const anyErrors: ErrorsType = {};

    if (nameData === '') {
      anyErrors.name = 'Введите имя';
    }

    if (emailData === '') {
      anyErrors.email = 'Введите email';
    }

    if (phoneData === '') {
      anyErrors.phone = 'Введите номер телефона';
    }

    if (Object.keys(anyErrors).length > 0) {
      setError(anyErrors);
      return;
    }

    setError({});
    const addressData = (formData.get('address') as string)?.trim() ?? '';
    const deliveryData = ((formData.get('delivery') as string)?.trim() ??
      '') as CheckoutData['delivery'];

    const currentItems = checkedItems.map((i) => ({
      id: i.id,
      size: i.selectedSize || null,
      price: i.price,
    }));

    const comment = (formData.get('comment') as string)?.trim() ?? '';
    const paymentData = ((formData.get('payment') as string)?.trim() ??
      '') as CheckoutData['payment'];

    // const comment = formData.get('comment') ?? undefined;

    let cardInfo: CheckoutData['card'] = undefined;

    if (activePay === 'online') {
      cardInfo = {
        number: cardPay.number,
        expiry: cardPay.expiry,
        cvv: cardPay.cvv,
      };
    } else {
      cardInfo = undefined;
    }

    const mainObj = {
      card: cardInfo,
      email: emailData,
      address: addressData,
      delivery: deliveryData,
      items: currentItems,
      name: nameData,
      phone: phoneData,
      payment: paymentData,
      total: `${total} ₽`,
      comment: comment,
    };
    if (onSubmit) {
      onSubmit(mainObj);
    }
    onClose();
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="modal-title">
          <h1>Оформление заказа</h1>
          <button className="close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-main">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <label htmlFor="name">Имя *</label>
                {error.name && <span className="error-text">{error.name}</span>}
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setCorrrectName(e.target.value)}
                  id="name"
                  type="text"
                  className={`${error.name ? 'error' : ''} ${name.trim() ? 'green' : ''}`}
                />
                <label htmlFor="email">email *</label>
                {error.name && (
                  <span className="error-text">{error.email}</span>
                )}
                <input
                  name="email"
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setCorrectEmail(e.target.value)}
                  className={`${error.email ? 'error' : ''} ${email.trim() ? 'green' : ''}`}
                />

                <label htmlFor="address">адрес</label>
                <input name="address" id="address" type="text" />
                <label htmlFor="phone">телефон *</label>
                {error.name && (
                  <span className="error-text">{error.phone}</span>
                )}
                <input
                  name="phone"
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setCorrectPhone(e.target.value)}
                  placeholder="+7(000)000-00-00"
                  className={`${error.phone ? 'error' : ''} ${phone.trim() ? 'green' : ''}`}
                />
                <p>Доставка</p>
                <div className="info-wrapperr">
                  <div
                    className={`div ${active === 'courier' ? 'active' : ''}`}
                    onClick={() => setActive('courier')}
                  >
                    <label htmlFor="courier">курьером</label>
                    <input
                      id="courier"
                      type="radio"
                      name="delivery"
                      value="courier"
                      defaultChecked
                    />
                  </div>
                  <div
                    className={`div ${active === 'pickup' ? 'active' : ''}`}
                    onClick={() => setActive('pickup')}
                  >
                    <label htmlFor="pickup">пункт выдачи</label>
                    <input
                      id="pickup"
                      type="radio"
                      name="delivery"
                      value="pickup"
                    />
                  </div>
                  <div
                    className={`div ${active === 'post' ? 'active' : ''}`}
                    onClick={() => setActive('post')}
                  >
                    <label htmlFor="post">почта</label>
                    <input
                      id="post"
                      type="radio"
                      name="delivery"
                      value="post"
                    />
                  </div>
                </div>
                <p>Оплата</p>
                <div className="info-wrapperr">
                  <div
                    className={`div ${activePay === 'card' ? 'active' : ''}`}
                    onClick={() => setActivePay('card')}
                  >
                    <label htmlFor="card">картой</label>
                    <input
                      defaultChecked
                      id="card"
                      name="payment"
                      value="card"
                      type="radio"
                    />
                  </div>
                  <div
                    className={`div ${activePay === 'cash' ? 'active' : ''}`}
                    onClick={() => setActivePay('cash')}
                  >
                    <label htmlFor="cash">наличными</label>
                    <input id="cash" name="payment" value="cash" type="radio" />
                  </div>
                  <div
                    className={`div ${activePay === 'online' ? 'active' : ''}`}
                    onClick={() => setActivePay('online')}
                  >
                    <label htmlFor="online">онлайн</label>
                    <input
                      id="online"
                      name="payment"
                      value="online"
                      type="radio"
                    />
                  </div>
                  {activePay === 'online' && (
                    <CardPay onChange={setCardPay} value={cardPay} />
                  )}
                </div>
                <label htmlFor="comment">Комментарий к заказу</label>
                <textarea
                  name="comment"
                  id="comment"
                  placeholder="Введите комментарий"
                ></textarea>
              </fieldset>
              <button>отправить</button>
            </form>
          </div>
          <div className="selected-item">
            {cart.filter((item) => item.isChecked).length > 0 ? (
              cart
                .filter((item) => item.isChecked)
                .map((item) => (
                  <Link key={item.id} to={`/item/${item.id}`}>
                    <div className="cart-item">
                      <img src={item.image} alt={item.title} />
                      <div>
                        <h4>{item.title}</h4>
                        <p>Цена: {item.price} руб.</p>

                        {item.selectedSize && (
                          <p>
                            <strong>Размер: {item.selectedSize}</strong>
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
            ) : (
              <p>Выбери товар</p>
            )}
            <div className="yu">{`${total} руб.`}</div>
          </div>
        </div>
        {/* <div className="ffff"></div> */}
      </div>
    </div>
  );
}

{
}
