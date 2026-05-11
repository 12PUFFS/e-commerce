from django.shortcuts import render
from django.http import JsonResponse


products = [
  {
    'id': 1,
    'title': 'Nike Dunk Low Retro',
    'price': '13 490',
    'image': 'https://ir.ozone.ru/s3/multimedia-1-t/wc1000/7695221033.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      'Кроссовки Nike Dunk Low Retro - это стильная и универсальная модель...',
    'rating': 4.5,
    'photos': [
      'https://ir.ozone.ru/s3/multimedia-1-t/wc1000/7695221033.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-1/wc1000/7695221041.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-o/wc1000/7695221028.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-5/wc1000/7695221009.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-c/wc1000/7695221016.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-f/wc1000/7695221019.jpg',
    ],
    'desc': [
      'Материал: Композиционная кожа',
      'Страна-производитель: Вьетнам',
      'Материал стельки - ЭВА (вспененный полимер)+искусственная кожа+текстиль',
      'Материал подошвы обуви - Искусственные материалы',
      'Спортивное назначение - Фитнес, Бег, Автоспорт, Волейбол',
      'Сезон - На любой сезон',
    ],
    'variants': [
      'https://ir.ozone.ru/s3/multimedia-1-t/wc1000/7695221033.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
    ],
    'availableSizes': [38, 39, 40, 41, 42, 43, 45],
    'models': 'dunk',
    'status': 'new',
  },

  {
    'id': 2,
    'title': 'Nike Dunk Low Retro',
    'price': '13 490',
    'image': 'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      'Кроссовки Nike Dunk Low Retro - это стильная и универсальная модель...',
    'rating': 4.4,
    'photos': [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-5/wc1000/7435891661.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-d/wc1000/7435891669.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-y/wc1000/7435891690.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-e/wc1000/7435891634.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-v/wc1000/7435891651.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-l/wc1000/7435891605.jpg',
    ],
    'desc': [
      'Материал - Кожа',
      'Материал стельки - Вспененный полиуретан+микрофибра',
      'Материал подошвы обуви - Искусственный каучук',
      'Сезон - На любой сезон',
      'Бренд в одежде и обуви - Nike',
    ],
    'variants': [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
    ],
    'availableSizes': [38, 39, 40, 41],
    'models': 'dunk',
    'status': 'new',
  },

  {
    'id': 3,
    'title': 'Nike Dunk Low Retro',
    'price': '14 912',
    'image':'http://localhost:8001/react_router/src/images/dunk-brown.png',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      'Кроссовки NIKE Air Force 1 - это стильная и универсальная модель...',
    'rating': 4.4,
    'photos': [
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/8074155424.jpg',
      'https://avatars.mds.yandex.net/get-mpic/7498982/2a00000192ec444afff52f3268a308a3451b/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5287649/2a00000192ec444af665834f9da2c09a506f/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5220415/2a00000192ec444aed6abd3be0c1a6228a02/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5235334/2a00000192ec444af4d009ee1b28571e9053/900x1200',
      'https://ir.ozone.ru/s3/multimedia-1-l/wc1000/7435891605.jpg',
    ],
    'desc': [
      'Цвет товара - белый',
      'Застежка- шнуровка',
      'Вид спорта - повседневные',
      'Материал верха - искусственная кожа, натуральная кожа',
      'Материал стельки - искусственная замша',
      'Материал подошвы  - ЭВА, резина',
      'Сезон - всесезон',
      'Бренд  - Nike',
    ],
    'variants': [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
    ],
    'availableSizes': [38, 39, 40, 41],
    'models': 'dunk',
    'status': 'new',
  },

  {
    'id': 4,
    'title': 'NIKE Air Force 1',
    'price': '14 912',
    'image':
      'https://avatars.mds.yandex.net/get-mpic/986077/2a00000192ec444afcccb0f62be69d2aa8fa/900x1200',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      'Кроссовки NIKE Air Force 1 - это стильная и универсальная модель...',
    'rating': 4.4,
    'photos': [
      'https://avatars.mds.yandex.net/get-mpic/986077/2a00000192ec444afcccb0f62be69d2aa8fa/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5258494/2a00000192ec444afaa701355e71b8433da9/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/7498982/2a00000192ec444afff52f3268a308a3451b/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5287649/2a00000192ec444af665834f9da2c09a506f/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5220415/2a00000192ec444aed6abd3be0c1a6228a02/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5235334/2a00000192ec444af4d009ee1b28571e9053/900x1200',
    ],
    'desc': [
      'Цвет товара - белый',
      'Застежка- шнуровка',
      'Вид спорта - повседневные',
      'Материал верха - искусственная кожа, натуральная кожа',
      'Материал стельки - искусственная замша',
      'Материал подошвы  - ЭВА, резина',
      'Сезон - всесезон',
      'Бренд  - Nike',
    ],
    'variants': [
      'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
    ],
    'availableSizes': [38, 39, 40, 41],
    'models': 'force',
    'status': 'hit',
  },
    {
    'id': 5,
    'title': 'Nike Air Max 90',
    'price': '23 999',
    'image':
      'https://static.street-beat.ru/upload/resize_cache/iblock/48b/666_666_1/y5z4vrwq6r1ehugbc5x8vehpko4hxl68.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':[
    'Кроссовки Nike Dunk Low Retro - это стильная и универсальная модель.',
    'Они отлично подходят для повседневной носки.',
    'Классический дизайн никогда не выходит из моды.'
    ],
    'rating': 4.4,
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/48b/666_666_1/y5z4vrwq6r1ehugbc5x8vehpko4hxl68.jpg',
      'https://avatars.mds.yandex.net/get-mpic/5258494/2a00000192ec444afaa701355e71b8433da9/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/7498982/2a00000192ec444afff52f3268a308a3451b/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5287649/2a00000192ec444af665834f9da2c09a506f/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5220415/2a00000192ec444aed6abd3be0c1a6228a02/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5235334/2a00000192ec444af4d009ee1b28571e9053/900x1200',
      'https://ir.ozone.ru/s3/multimedia-1-l/wc1000/7435891605.jpg',
    ],
    'desc': [
      'Низкий силуэт',
      'Верх из текстиля и кожи',
      'Дышащая внутренняя подкладка',
      'Шнуровка с дополнительными отверстиями',
      'Технология Nike Air для усиленной амортизации',
      'Резиновая подошва с протектором',
      'Swoosh на боковой стороне модели',
      'Брендинг Nike',
    ],
    # 'variants': [
    #   'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
    #   'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
    # ],
    'availableSizes': [38, 39, 40, 41],
    'models': 'force',
    'status': 'hit',
  },
      {
    'id': 6,
    'title': 'adidas Superstar II',
    'price': '15 699',
    'image':
      'https://static.street-beat.ru/upload/resize_cache/iblock/7ea/666_666_1/rh90t0d1q00d372jlofbp57kdhbcbztw.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      'Кроссовки adidas Superstar впервые вышли на баскетбольные площадки в 1970 году. Прошло совсем немного времени, прежде чем они превратились из обуви для спортсменов в икону уличной моды. Модель adidas Superstar II выполнена в том же стиле, с теми же пропорциями и из тех же материалов, которые сделали оригинальную модель легендой. Верх из гладкой кожи дополнен спортивными тремя полосками и накладкой на пятке. Финальный штрих — классический резиновый мысок-ракушка.',
    'rating': 4.4,
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/7ea/666_666_1/rh90t0d1q00d372jlofbp57kdhbcbztw.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/3a4/666_666_1/yb6zmsryhjudipr9m5m98tj8yly3tt91.jpg',
      'https://avatars.mds.yandex.net/get-mpic/7498982/2a00000192ec444afff52f3268a308a3451b/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5287649/2a00000192ec444af665834f9da2c09a506f/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5220415/2a00000192ec444aed6abd3be0c1a6228a02/900x1200',
      'https://avatars.mds.yandex.net/get-mpic/5235334/2a00000192ec444af4d009ee1b28571e9053/900x1200',
      'https://ir.ozone.ru/s3/multimedia-1-l/wc1000/7435891605.jpg',
    ],
    'desc': [
      'Низкий силуэт',
      'Верх из текстиля и кожи',
      'Дышащая внутренняя подкладка',
      'Шнуровка с дополнительными отверстиями',
      'Технология Nike Air для усиленной амортизации',
      'Резиновая подошва с протектором',
      'Swoosh на боковой стороне модели',
      'Брендинг Nike',
    ],
    'variants': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/7ea/666_666_1/rh90t0d1q00d372jlofbp57kdhbcbztw.jpg',
      'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7695221116.jpg',
    ],
    'availableSizes': [38, 39, 40, 41],
    'models': 'force',
    'status': 'hit',
  },
]

def products_list(request):
    return  JsonResponse({'products': products}, safe=False)
    