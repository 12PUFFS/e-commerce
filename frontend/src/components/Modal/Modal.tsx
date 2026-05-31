// @ts-ignore
import { Link } from 'react-router-dom';
import './Modal.css';
import type { Product } from '../../App';
import { useState, useRef } from 'react';

interface ModalType {
  cart: Product[];
  onClose: () => void;
  setCart?: (cart: Product[] | ((prev: Product[]) => Product[])) => void;
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
  const expiryRef = useRef<HTMLInputElement>(null);
  const cvvRef = useRef<HTMLInputElement>(null);

  const formatCardNumber = (input: string) => {
    const onlyDigit = input.replace(/\D/g, '');
    const trimmed = onlyDigit.slice(0, 16);
    const spases = trimmed.replace(/(\d{4})/g, '$1 ').trim();
    return spases.trim();
  };

  const formattedDate = (input: string) => {
    const digits = input.replace(/\D/g, '').slice(0, 4);
    if (!digits) return '';
    if (digits.length === 1 && digits >= '1' && digits <= '9') {
      return `0${digits}`;
    }
    if (digits.length === 2) {
      return digits;
    }
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

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const formatted = formatCardNumber(e.target.value);
    onChange({ ...value, number: formatted });
    if (raw.length === 16) {
      expiryRef.current?.focus();
    }
  };

  return (
    <>
      <div className="warning">
        <p>Введите вашу карту</p>
      </div>
      <div className="card">
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
                  onChange={(e) => {
                    const row = e.target.value.replace(/\D/g, '').slice(0, 3);
                    onChange({ ...value, cvv: row });
                  }}
                  type="password"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// interface CheckoutData {
//   email: string;
//   name: string;
//   phone: string;
//   address: string;
//   delivery: 'courier' | 'pickup' | 'post';
//   payment: 'card' | 'cash' | 'online';
//   comment?: string;
//   items: Array<{ id: number; size: number | string | null; price: string }>;
//   total: string;
//   card?: {
//     number: string;
//     expiry: string;
//     cvv: string;
//   };
// }

type ErrorsType = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export default function Modal({ cart, onClose, setCart }: ModalType) {
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
  const [thankYouModal, setThankYouModal] = useState(false);
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

  const validatePhoneNumber = (input: string) => {
    let digits = input.replace(/\D/g, '');
    if (digits.startsWith('+')) {
      digits = digits.slice(1);
    }
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    }
    if (digits.length > 0 && !digits.startsWith('7')) {
      digits = '7' + digits;
    }
    digits = digits.slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length === 1) return '+7 (';
    if (digits.length <= 4) return '+7 (' + digits.slice(1);
    if (digits.length <= 7)
      return '+7 (' + digits.slice(1, 4) + ') ' + digits.slice(4);
    if (digits.length <= 9)
      return (
        '+7 (' +
        digits.slice(1, 4) +
        ') ' +
        digits.slice(4, 7) +
        '-' +
        digits.slice(7)
      );
    return (
      '+7 (' +
      digits.slice(1, 4) +
      ') ' +
      digits.slice(4, 7) +
      '-' +
      digits.slice(7, 9) +
      '-' +
      digits.slice(9)
    );
  };

  const resetForm = () => {
    setCorrrectName('');
    setCorrectEmail('');
    setCorrectPhone('');
    setCardPay({ number: '', expiry: '', cvv: '' });
    setActive('courier');
    setActivePay('card');
    setError({ name: '', email: '', phone: '', address: '' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const phoneData = (formData.get('phone') as string)?.trim() ?? '';
    const nameData = (formData.get('name') as string)?.trim() ?? '';
    const emailData = (formData.get('email') as string)?.trim() ?? '';

    const anyErrors: ErrorsType = {};

    if (nameData === '') anyErrors.name = 'Введите имя';
    if (emailData === '') anyErrors.email = 'Введите email';
    if (phoneData === '') anyErrors.phone = 'Введите номер телефона';

    const rowPhone = phoneData.replace(/\D/g, '');
    if (rowPhone.length < 11) anyErrors.phone = 'Введите корректный номер';

    if (Object.keys(anyErrors).length > 0) {
      setError(anyErrors);
      return;
    }

    setError({});

    // ✅ Сначала показываем модалку благодарности
    setThankYouModal(true);
  };

  const handleCloseThankYou = () => {
    // ✅ Удаляем купленные товары ТОЛЬКО при закрытии модалки благодарности
    if (setCart) {
      const remainingItems = cart.filter((item) => !item.isChecked);
      setCart(remainingItems);
    }

    setThankYouModal(false);
    resetForm();
    onClose();
  };

  return (
    <>
      {/* Модалка "Спасибо за заказ" */}
      {thankYouModal && (
        <div className="thankyou-modal-overlay">
          <div className="thankyou-modal">
            <h2>Спасибо за заказ!</h2>
            <p>Наш менеджер свяжется с вами в ближайшее время</p>
            <button onClick={handleCloseThankYou}>Закрыть</button>
          </div>
        </div>
      )}

      {/* Основная модалка */}
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
                  {error.name && (
                    <span className="error-text">{error.name}</span>
                  )}
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setCorrrectName(e.target.value)}
                    id="name"
                    type="text"
                    className={`${error.name ? 'error' : ''} ${name.trim() ? 'green' : ''}`}
                  />

                  <label htmlFor="email">Email *</label>
                  {error.email && (
                    <span className="error-text">{error.email}</span>
                  )}
                  <input
                    name="email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setCorrectEmail(e.target.value)}
                    className={`${error.email ? 'error' : ''} ${email.trim() ? 'green' : ''}`}
                  />

                  <label htmlFor="address">Адрес</label>
                  <input name="address" id="address" type="text" />

                  <label htmlFor="phone">Телефон *</label>
                  {error.phone && (
                    <span className="error-text">{error.phone}</span>
                  )}
                  <input
                    name="phone"
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const formatted = validatePhoneNumber(e.target.value);
                      setCorrectPhone(formatted);
                    }}
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
                      <input
                        id="cash"
                        name="payment"
                        value="cash"
                        type="radio"
                      />
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
                <button type="submit">отправить</button>
              </form>
            </div>
            <div className="selected-item">
              {checkedItems.length > 0 ? (
                checkedItems.map((item) => (
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
        </div>
      </div>
    </>
  );
}
