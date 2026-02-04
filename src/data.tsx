export interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  photos: string[];
  description: string;
  fulldesc: string;
  category: string;
  models: string;
  desc: string[];
  rating: number;
  availableSizes: number[];
  variants: [string, string] | [];
  selectedSize?: number | null;
  status: string;
}

import airForce from './images/air-force.png';
import dunkBrown from './images/dunk-brown.png';
import dunkGreen from './images/dunk-green.png';
import dunkBlue from './images/dunkBlue.png';

const products: Product[] = [
  {
    id: 1,
    title: 'Кроссовки Nike Dunk Low Retro',
    price: '13 490',
    image: 'https://ir.ozone.ru/s3/multimedia-1-t/wc1000/7695221033.jpg',
    description: 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    category: 'shoes',
    fulldesc:
      'Кроссовки Nike Dunk Low Retro - это стильная и универсальная модель...',
    rating: 4.5,
    photos: [
      'https://ir.ozone.ru/s3/multimedia-1-t/wc1000/7695221033.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-1/wc1000/7695221041.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-o/wc1000/7695221028.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-5/wc1000/7695221009.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-c/wc1000/7695221016.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-f/wc1000/7695221019.jpg',
    ],
    desc: [
      'Материал: Композиционная кожа',
      'Страна-производитель: Вьетнам',
      'Материал стельки - ЭВА (вспененный полимер)+искусственная кожа+текстиль',
      'Материал подошвы обуви - Искусственные материалы',
      'Спортивное назначение - Фитнес, Бег, Автоспорт, Волейбол',
      'Сезон - На любой сезон',
    ],
    variants: [
      'https://ir.ozone.ru/s3/multimedia-1-t/wc1000/7695221033.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
    ],
    availableSizes: [38, 39, 40, 41, 42, 43, 45],
    models: 'dunk',
    status: 'new',
  },

  {
    id: 2,
    title: 'Кроссовки Nike Dunk Low Retro',
    price: '13 490',
    image: 'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
    description: 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    category: 'shoes',
    fulldesc:
      'Кроссовки Nike Dunk Low Retro - это стильная и универсальная модель...',
    rating: 4.4,
    photos: [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-5/wc1000/7435891661.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-d/wc1000/7435891669.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-y/wc1000/7435891690.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-e/wc1000/7435891634.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-v/wc1000/7435891651.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-l/wc1000/7435891605.jpg',
    ],
    desc: [
      'Материал - Кожа',
      'Материал стельки - Вспененный полиуретан+микрофибра',
      'Материал подошвы обуви - Искусственный каучук',
      'Сезон - На любой сезон',
      'Бренд в одежде и обуви - Nike',
    ],
    variants: [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
    ],
    availableSizes: [38, 39, 40, 41],
    models: 'dunk',
    status: 'new',
  },

  {
    id: 3,
    title: 'Кроссовки NIKE Air Force 1',
    price: '14 912',
    image: dunkBrown,
    description: 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    category: 'shoes',
    fulldesc:
      'Кроссовки NIKE Air Force 1 - это стильная и универсальная модель...',
    rating: 4.4,
    photos: [
      dunkBrown,
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/8074155424.jpg',
      'https://avatars.mds.yandex.net/get-mpic/7498982/2a00000192ec444afff52f3268a308a3451b/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5287649/2a00000192ec444af665834f9da2c09a506f/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5220415/2a00000192ec444aed6abd3be0c1a6228a02/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5235334/2a00000192ec444af4d009ee1b28571e9053/900x1200',
      // 'https://ir.ozone.ru/s3/multimedia-1-l/wc1000/7435891605.jpg',
    ],
    desc: [
      'Цвет товара - белый',
      'Застежка- шнуровка',
      'Вид спорта - повседневные',
      'Материал верха - искусственная кожа, натуральная кожа',
      'Материал стельки - искусственная замша',
      'Материал подошвы  - ЭВА, резина',
      'Сезон - всесезон',
      'Бренд  - Nike',
    ],
    variants: [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
    ],
    availableSizes: [38, 39, 40, 41],
    models: 'dunk',
    status: 'new',
  },

  {
    id: 4,
    title: 'Кроссовки NIKE Air Force 1',
    price: '14 912',
    image:
      'https://avatars.mds.yandex.net/get-mpic/986077/2a00000192ec444afcccb0f62be69d2aa8fa/900x1200',
    description: 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    category: 'shoes',
    fulldesc:
      'Кроссовки NIKE Air Force 1 - это стильная и универсальная модель...',
    rating: 4.4,
    photos: [
      'https://avatars.mds.yandex.net/get-mpic/986077/2a00000192ec444afcccb0f62be69d2aa8fa/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5258494/2a00000192ec444afaa701355e71b8433da9/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/7498982/2a00000192ec444afff52f3268a308a3451b/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5287649/2a00000192ec444af665834f9da2c09a506f/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5220415/2a00000192ec444aed6abd3be0c1a6228a02/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5235334/2a00000192ec444af4d009ee1b28571e9053/900x1200',
      // 'https://ir.ozone.ru/s3/multimedia-1-l/wc1000/7435891605.jpg',
    ],
    desc: [
      'Цвет товара - белый',
      'Застежка- шнуровка',
      'Вид спорта - повседневные',
      'Материал верха - искусственная кожа, натуральная кожа',
      'Материал стельки - искусственная замша',
      'Материал подошвы  - ЭВА, резина',
      'Сезон - всесезон',
      'Бренд  - Nike',
    ],
    variants: [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
    ],
    availableSizes: [38, 39, 40, 41],
    models: 'force',
    status: 'new',
  },
  {
    id: 1,
    title: 'Кроссовки Nike Dunk Low Retro',
    price: '13 490',
    image: 'https://ir.ozone.ru/s3/multimedia-1-t/wc1000/7695221033.jpg',
    description: 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    category: 'shoes',
    fulldesc:
      'Кроссовки Nike Dunk Low Retro - это стильная и универсальная модель...',
    rating: 4.5,
    photos: [
      'https://ir.ozone.ru/s3/multimedia-1-t/wc1000/7695221033.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-1/wc1000/7695221041.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-o/wc1000/7695221028.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-5/wc1000/7695221009.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-c/wc1000/7695221016.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-f/wc1000/7695221019.jpg',
    ],
    desc: [
      'Материал: Композиционная кожа',
      'Страна-производитель: Вьетнам',
      'Материал стельки - ЭВА (вспененный полимер)+искусственная кожа+текстиль',
      'Материал подошвы обуви - Искусственные материалы',
      'Спортивное назначение - Фитнес, Бег, Автоспорт, Волейбол',
      'Сезон - На любой сезон',
    ],
    variants: [
      'https://ir.ozone.ru/s3/multimedia-1-t/wc1000/7695221033.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
    ],
    availableSizes: [38, 39, 40, 41, 42, 43, 45],
    models: 'dunk',
    status: 'new',
  },

  {
    id: 2,
    title: 'Кроссовки Nike Dunk Low Retro',
    price: '13 490',
    image: 'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
    description: 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    category: 'shoes',
    fulldesc:
      'Кроссовки Nike Dunk Low Retro - это стильная и универсальная модель...',
    rating: 4.4,
    photos: [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-5/wc1000/7435891661.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-d/wc1000/7435891669.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-y/wc1000/7435891690.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-e/wc1000/7435891634.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-v/wc1000/7435891651.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-l/wc1000/7435891605.jpg',
    ],
    desc: [
      'Материал - Кожа',
      'Материал стельки - Вспененный полиуретан+микрофибра',
      'Материал подошвы обуви - Искусственный каучук',
      'Сезон - На любой сезон',
      'Бренд в одежде и обуви - Nike',
    ],
    variants: [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
    ],
    availableSizes: [38, 39, 40, 41],
    models: 'dunk',
    status: 'new',
  },

  {
    id: 3,
    title: 'Кроссовки NIKE Air Force 1',
    price: '14 912',
    image: dunkBrown,
    description: 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    category: 'shoes',
    fulldesc:
      'Кроссовки NIKE Air Force 1 - это стильная и универсальная модель...',
    rating: 4.4,
    photos: [
      dunkBrown,
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/8074155424.jpg',
      'https://avatars.mds.yandex.net/get-mpic/7498982/2a00000192ec444afff52f3268a308a3451b/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5287649/2a00000192ec444af665834f9da2c09a506f/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5220415/2a00000192ec444aed6abd3be0c1a6228a02/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5235334/2a00000192ec444af4d009ee1b28571e9053/900x1200',
      // 'https://ir.ozone.ru/s3/multimedia-1-l/wc1000/7435891605.jpg',
    ],
    desc: [
      'Цвет товара - белый',
      'Застежка- шнуровка',
      'Вид спорта - повседневные',
      'Материал верха - искусственная кожа, натуральная кожа',
      'Материал стельки - искусственная замша',
      'Материал подошвы  - ЭВА, резина',
      'Сезон - всесезон',
      'Бренд  - Nike',
    ],
    variants: [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
    ],
    availableSizes: [38, 39, 40, 41],
    models: 'dunk',
    status: 'new',
  },

  {
    id: 4,
    title: 'Кроссовки NIKE Air Force 1',
    price: '14 912',
    image:
      'https://avatars.mds.yandex.net/get-mpic/986077/2a00000192ec444afcccb0f62be69d2aa8fa/900x1200',
    description: 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    category: 'shoes',
    fulldesc:
      'Кроссовки NIKE Air Force 1 - это стильная и универсальная модель...',
    rating: 4.4,
    photos: [
      'https://avatars.mds.yandex.net/get-mpic/986077/2a00000192ec444afcccb0f62be69d2aa8fa/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5258494/2a00000192ec444afaa701355e71b8433da9/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/7498982/2a00000192ec444afff52f3268a308a3451b/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5287649/2a00000192ec444af665834f9da2c09a506f/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5220415/2a00000192ec444aed6abd3be0c1a6228a02/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5235334/2a00000192ec444af4d009ee1b28571e9053/900x1200',
      // 'https://ir.ozone.ru/s3/multimedia-1-l/wc1000/7435891605.jpg',
    ],
    desc: [
      'Цвет товара - белый',
      'Застежка- шнуровка',
      'Вид спорта - повседневные',
      'Материал верха - искусственная кожа, натуральная кожа',
      'Материал стельки - искусственная замша',
      'Материал подошвы  - ЭВА, резина',
      'Сезон - всесезон',
      'Бренд  - Nike',
    ],
    variants: [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
    ],
    availableSizes: [38, 39, 40, 41],
    models: 'force',
    status: 'new',
  },
];

export default products;

//
