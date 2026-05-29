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
      ['Кроссовки Nike Dunk Low Retro - это стильная и универсальная модель...'],
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
      ['Кроссовки Nike Dunk Low Retro - это стильная и универсальная модель...'],
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
    'title': 'Nike Dunk Low Next Nature',
    'price': '19 999',
    'image': 'https://static.street-beat.ru/upload/resize_cache/iblock/69b/666_666_1/5qlunwlwdpa710w30m7cigeco46v9htg.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      ['Кроссовки Nike Dunk Low Retro - это стильная и универсальная модель...'],
    'rating': 4.4,
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/69b/666_666_1/5qlunwlwdpa710w30m7cigeco46v9htg.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/67f/666_666_1/6nz34i59k14zl8krq3c62h0q1zevreqr.jpg',
      'https://static.street-beat.ru/upload/iblock/e9f/pef0vaipd2mlzpwg00krp27x6ydzpgyu.jpg',
      'https://static.street-beat.ru/upload/iblock/4ea/xai10mbh3n1f6d8vp3c4hzd7r7wf5jxy.jpg',
      'https://static.street-beat.ru/upload/iblock/6b6/lv1yyttg1hebk1zjqsudv8vh2bcripsx.jpg',

    ],
    'desc': [
      'Материал - Кожа',
      'Материал стельки - Вспененный полиуретан+микрофибра',
      'Материал подошвы обуви - Искусственный каучук',
      'Сезон - На любой сезон',
      'Бренд в одежде и обуви - Nike',
    ],
    'variants': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/69b/666_666_1/5qlunwlwdpa710w30m7cigeco46v9htg.jpg'
    ],
    'availableSizes': [36,37,38, 39, 40],
    'models': 'https://static.street-beat.ru/upload/resize_cache/iblock/69b/666_666_1/5qlunwlwdpa710w30m7cigeco46v9htg.jpg',
    'status': 'hit',
  },

      {
    'id': 4,
    'title': 'Nike Dunk Low',
    'price': '22 999',
    'image': 'https://static.street-beat.ru/upload/resize_cache/iblock/d84/666_666_1/ez2avnzus6eq0erx4caar7lwplany2wx.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      ['Созданные специально для баскетбольной площадки, кроссовки Nike Dunk Low покоряют улицы города за ее пределами начиная с 80-х годов. И делают это максимально успешно. Верх пары изготовлен из натуральной кожи. Перфорация на мыске хорошо пропускает воздух, а дополнительные отверстия для шнуровки позволяют настроить комфортную плотность. Амортизация надежно защищает стопы от ударных нагрузок. Резиновая подошва с протектором минимизирует скольжение и создает уверенное сцепление с поверхностью. Стильный визуал и современные технологии делают эти кроссовки актуальными во все времена.'],
    'rating': 4.4,
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/d84/666_666_1/ez2avnzus6eq0erx4caar7lwplany2wx.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/6ff/666_666_1/7va6yrk3iwxroq94wqgp361ymgcy39tb.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/d03/666_666_1/g2q9pzr5pr83qi1w6cpku11nnbh3y579.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/d6a/666_666_1/q7ibi5jwyy8o16ugo962vqcblvnhyrux.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/f17/666_666_1/qarxbr1qfwrp7ynlqc00zo80h22ktpq3.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/8eb/666_666_1/ke2aj80gu2sbgev6osp9cc4lct5814w5.jpg',
     

    ],
    'desc': [
      'Материал - Кожа',
      'Материал стельки - Вспененный полиуретан+микрофибра',
      'Материал подошвы обуви - Искусственный каучук',
      'Сезон - На любой сезон',
      'Бренд в одежде и обуви - Nike',
    ],
    'variants': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/69b/666_666_1/5qlunwlwdpa710w30m7cigeco46v9htg.jpg'
    ],
    'availableSizes': [38, 39, 40, 41],
    'models': 'https://static.street-beat.ru/upload/resize_cache/iblock/69b/666_666_1/5qlunwlwdpa710w30m7cigeco46v9htg.jpg',
    'status': 'nit',
  },

  {
    'id': 5,
    'title': 'Nike Blazer Mid `77 Vintage',
    'price': '9 699',
    'image':'https://static.street-beat.ru/upload/resize_cache/iblock/27c/666_666_1/drv0siaqm7nwxi0k5ji10attkmvy8vc1.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      ['Кроссовки NIKE Air Force 1 - это стильная и универсальная модель...'],
    'rating': 4.4,
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/27c/666_666_1/drv0siaqm7nwxi0k5ji10attkmvy8vc1.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/23d/666_666_1/a0rg86gw4rs0lrcvmi20r8tuh17m0kr4.jpg',
      'https://static.street-beat.ru/upload/iblock/e3c/8hjkmz54h3qogkgeedq6dzb3eyeabaad.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/47d/666_666_1/gwmnilvf09zxjikrnvdntuoxrp7q1uzk.jpg',
      'https://static.street-beat.ru/upload/iblock/e3e/bdp12329mnbzm1hkv32qz32xcy5d47gl.jpg',
      
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
    'models': 'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/7435891604.jpg',
    'status': 'new',
  },

  {
    'id': 6,
    'title': 'NIKE Air Force 1',
    'price': '14 912',
    'image':
      'https://avatars.mds.yandex.net/get-mpic/986077/2a00000192ec444afcccb0f62be69d2aa8fa/900x1200',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      ['Кроссовки NIKE Air Force 1 - это стильная и универсальная модель...'],
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
    'id': 7,
    'title': 'Nike Air Max 90',
    'price': '23 999',
    'image':
      'https://static.street-beat.ru/upload/resize_cache/iblock/590/666_666_1/p538b44xjtftpk2rir04vpoxwme0ummz.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':[
    'Кроссовки Nike Dunk Low Retro - это стильная и универсальная модель.',
    'Они отлично подходят для повседневной носки.',
    'Классический дизайн никогда не выходит из моды.'
    ],
    'rating': 4.4,
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/590/666_666_1/p538b44xjtftpk2rir04vpoxwme0ummz.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/0b0/666_666_1/kjllxjwor42fqcs7sj0xm5euarowcz79.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/0de/666_666_1/qkvywgjhfhvkxzuh5fnvfh4vnnev8xk1.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/b54/666_666_1/nyk1bj1d7qixjbynfpdmvhp0u3xlysyj.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/1be/666_666_1/hh0dz8p7f1jv3evshq6gra59p49yj2tr.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/736/666_666_1/0zkmkal710n332o5v8ji3pe1kxtdg2xm.jpg',
      
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
      'https://static.street-beat.ru/upload/resize_cache/iblock/48b/666_666_1/y5z4vrwq6r1ehugbc5x8vehpko4hxl68.jpg'
    ],
    'availableSizes': [38, 39, 40, 41],
    'models': 'https://static.street-beat.ru/upload/resize_cache/iblock/48b/666_666_1/y5z4vrwq6r1ehugbc5x8vehpko4hxl68.jpg',
    'status': 'hit',
  },
      {
    'id': 8,
    'title': 'adidas Superstar II',
    'price': '15 699',
    'image':
      'https://static.street-beat.ru/upload/resize_cache/iblock/f3e/666_666_1/zbar5ef5zry0ks25em6ofk7n6f42eeir.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      ['Кроссовки adidas Superstar впервые вышли на баскетбольные площадки в 1970 году. Прошло совсем немного времени, прежде чем они превратились из обуви для спортсменов в икону уличной моды. Модель adidas Superstar II выполнена в том же стиле, с теми же пропорциями и из тех же материалов, которые сделали оригинальную модель легендой. Верх из гладкой кожи дополнен спортивными тремя полосками и накладкой на пятке. Финальный штрих — классический резиновый мысок-ракушка.'],
    'rating': 4.4,
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/f3e/666_666_1/zbar5ef5zry0ks25em6ofk7n6f42eeir.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/85b/666_666_1/dupxibexsznxds4edj9oee1ix3ygfxdh.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/b82/666_666_1/gycjlprpgx9ceu3a41egae4a4nvw7e1y.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/474/666_666_1/50clpuipkb39j8i8ro8110f8vqdr9f86.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/b81/666_666_1/ud0ttbj9be5y3mhtflz5093ln5j1xgy7.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/a34/666_666_1/vz9qjb6jl6m7wkusn346p7102e9y569a.jpg',
      
    ],
    'desc': [
      'Низкий силуэт',
      'Кожаный верх',
      'Текстильная внутренняя подкладка',
      'Перфорация для циркуляции воздуха',
      'Резиновая подошва с зигзагообразным протектором',
      'Брендинг adidas',
    ],
    'variants': [
      '',
    ],
    'availableSizes': [38, 39, 40, 41],
    'models': 'https://static.street-beat.ru/upload/resize_cache/iblock/7ea/666_666_1/rh90t0d1q00d372jlofbp57kdhbcbztw.jpg',
    'status': 'hit',
  },
   {
    'id': 9,
    'title': 'adidas Drop Step Low 2.0',
    'price': '12 199',
    'image':
      'https://static.street-beat.ru/upload/resize_cache/iblock/f1d/666_666_1/o9qpmny0f4rtu8uhrw5cbz0i35mhit0z.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      ['Кроссовки adidas Superstar впервые вышли на баскетбольные площадки в 1970 году. Прошло совсем немного времени, прежде чем они превратились из обуви для спортсменов в икону уличной моды. Модель adidas Superstar II выполнена в том же стиле, с теми же пропорциями и из тех же материалов, которые сделали оригинальную модель легендой. Верх из гладкой кожи дополнен спортивными тремя полосками и накладкой на пятке. Финальный штрих — классический резиновый мысок-ракушка.'],
    'rating': 4.4,
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/f1d/666_666_1/o9qpmny0f4rtu8uhrw5cbz0i35mhit0z.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/c6f/666_666_1/d3yqhcky0ze4zzzcxz5nqvkietb4bsxx.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/9d8/666_666_1/o1r3ot3ois2452qe85biy10pnthidt83.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/507/666_666_1/ztd3vd8avkba8mjmw1eohzon6icsq4lk.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/f85/666_666_1/dk39hrp72ordctcwnwpkdk3cwnxjrziu.jpg',
      # 'https://static.street-beat.ru/upload/resize_cache/iblock/b81/666_666_1/ud0ttbj9be5y3mhtflz5093ln5j1xgy7.jpg',
      # 'https://static.street-beat.ru/upload/resize_cache/iblock/a34/666_666_1/vz9qjb6jl6m7wkusn346p7102e9y569a.jpg',
      
    ],
    'desc': [
    'Низкий силуэт',
    'Верх из искусственной кожи',
    'Текстильная внутренняя подкладка',
    'Мягкий язычок',
    'Перфорация на мыске и щиколотке',
    'Шнуровка с дополнительными отверстиями',
    'Технология Adiprene',
    'Резиновая подошва с цепким протектором',
    'Брендинг adidas'
    ],
    'variants': [
      '',
    ],
    'availableSizes': [38, 39, 40, 41],
    'models': 'https://static.street-beat.ru/upload/resize_cache/iblock/f1d/666_666_1/o9qpmny0f4rtu8uhrw5cbz0i35mhit0z.jpg',
    'status': 'hit',
  },
    {
    'id': 10,
    'title': 'adidas Сampus 00s',
    'price': '15 999',
    'image':
      'https://static.street-beat.ru/upload/resize_cache/iblock/2f4/666_666_1/pl7ot405u9m6gbfwmqnauqe2azn5wbas.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'shoes',
    'fulldesc':
      ['Кроссовки adidas Superstar впервые вышли на баскетбольные площадки в 1970 году. Прошло совсем немного времени, прежде чем они превратились из обуви для спортсменов в икону уличной моды. Модель adidas Superstar II выполнена в том же стиле, с теми же пропорциями и из тех же материалов, которые сделали оригинальную модель легендой. Верх из гладкой кожи дополнен спортивными тремя полосками и накладкой на пятке. Финальный штрих — классический резиновый мысок-ракушка.'],
    'rating': 4.4,
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/2f4/666_666_1/pl7ot405u9m6gbfwmqnauqe2azn5wbas.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/7d0/666_666_1/b77dtwle9tee0xzp0f7638inhb25zkmg.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/8b1/666_666_1/h1ijfqnvsict803kt5uvxvaqs59diue0.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/7be/666_666_1/vztudspji5e9ouc92fb9smfnfzyj73dt.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/785/666_666_1/sbn80x5z0z9ras9sud7wmk2x5jra6maf.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/1a1/666_666_1/54v9vcalbpd9i63omoo2kq09rdqhyjfx.jpg',
     
    ],
    'desc': [
    'Низкий силуэт',
    'Верх из натуральной замши',
    'Текстильная внутренняя подкладка',
    'Шнуровка с дополнительными отверстиями',
    'Перфорация по боковым сторонам модели для циркуляции воздуха',
    'Резиновая подошва с протектором',
    'Брендинг adidas'
    ],
    'variants': [
      '',
    ],
    'availableSizes': [38, 39, 40, 41],
    'models': 'https://static.street-beat.ru/upload/resize_cache/iblock/f1d/666_666_1/o9qpmny0f4rtu8uhrw5cbz0i35mhit0z.jpg',
    'status': 'hit',
  },

 {
    'id': 11,
    'title': 'The North Face Re-Grind Hydrenalite Parka',
    'price': '47 999',
    'image':
      'https://static.street-beat.ru/upload/resize_cache/iblock/9f7/666_666_1/mdctb3fonrzca9plhi52agxq8r3stz4r.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'clothing',
    'fulldesc':
      ['Культовый силуэт, рожденный для покорения восьмитысячников и адаптированный для динамичного ритма мегаполиса. Пуховик Regrind Himalayan Down Jacket от The North Face — это безупречное сочетание архивного наследия бренда и современных экологичных технологий.'],
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/9f7/666_666_1/mdctb3fonrzca9plhi52agxq8r3stz4r.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/ecf/666_666_1/1i00qn3v5lmq9fk91cheo2kuvgb5ze27.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/896/666_666_1/of202ttoy6e7kifdfe8tguu299egvern.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/766/666_666_1/8q6mc3h9it2ui2lvh8o1zshbyphmeo3x.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/774/666_666_1/ej2d2igssom41dp7j51pe57nsytuovql.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/a64/666_666_1/mnsilkg85bmsudb6hyoohteyfkpp33tt.jpg'
     
    ],
    'desc': [
 
    ],
    'variants': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/9f7/666_666_1/mdctb3fonrzca9plhi52agxq8r3stz4r.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/f2e/666_666_1/0a5wvos1c65c7aibuixif911em5yrwt8.jpg'
    ],
    'availableSizes': ['S', 'M', 'L', 'XL'],
    'models': 'northface1',
    'status': 'new',
  },
   {
    'id': 12,
    'title': 'The North Face Retro Nuptse Jacket',
    'price': '37 799',
    'image':
      'https://static.street-beat.ru/upload/resize_cache/iblock/de6/666_666_1/sawor6xyzntrv8nxs0y1e0tf8fbesb72.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'clothing',
    'fulldesc':
      ['Большие дутые отсеки, оригинальные цветовые решения и эталонное качество — всё это культовый пуховик Retro Nuptse Jacket. Немного укороченный силуэт модели отсылает нас к истории её создания, когда альпинистам было необходимо носить поясной ремень со снаряжением. Верхний слой куртки выполнен в стиле колор-блок из рипстоп-нейлона с водоотталкивающей пропиткой. В качестве утеплителя — гусиный пух, собранный по стандартам ответственного потребления. Эластичные манжеты и нижний край обеспечивают плотное прилегание и отличную посадку по фигуре. В воротнике спрятан лёгкий капюшон с козырьком. Собираясь в путешествие, вы можете сложить куртку в один из её карманов.'],
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/de6/666_666_1/sawor6xyzntrv8nxs0y1e0tf8fbesb72.jpg',
  'https://static.street-beat.ru/upload/resize_cache/iblock/8fe/666_666_1/ukqqv8dv2iaog9hj3c9sdd61i6t2ebqz.jpg',

     
    ],
    'desc': [
 
    ],
    'variants': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/9f7/666_666_1/mdctb3fonrzca9plhi52agxq8r3stz4r.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/f2e/666_666_1/0a5wvos1c65c7aibuixif911em5yrwt8.jpg',
    ],
    'availableSizes': ['S', 'M', 'L', 'XL', 'XXL'],
    'models': 'northface',
    'status': 'new',
  },
     {
    'id': 13,
    'title': 'The North Face Retro Nuptse Jacket',
    'price': '37 799',
    'image':
      'https://static.street-beat.ru/upload/resize_cache/iblock/f2e/666_666_1/0a5wvos1c65c7aibuixif911em5yrwt8.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'clothing',
    'fulldesc':
      ['Большие дутые отсеки, оригинальные цветовые решения и эталонное качество — всё это культовый пуховик Retro Nuptse Jacket. Немного укороченный силуэт модели отсылает нас к истории её создания, когда альпинистам было необходимо носить поясной ремень со снаряжением. Верхний слой куртки выполнен в стиле колор-блок из рипстоп-нейлона с водоотталкивающей пропиткой. В качестве утеплителя — гусиный пух, собранный по стандартам ответственного потребления. Эластичные манжеты и нижний край обеспечивают плотное прилегание и отличную посадку по фигуре. В воротнике спрятан лёгкий капюшон с козырьком. Собираясь в путешествие, вы можете сложить куртку в один из её карманов.'],
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/f2e/666_666_1/0a5wvos1c65c7aibuixif911em5yrwt8.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/28a/666_666_1/59j7am5yzo1vhixw5h839pcpyhrr7otd.jpg',

     
    ],
    'desc': [
 
    ],
    'variants': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/9f7/666_666_1/mdctb3fonrzca9plhi52agxq8r3stz4r.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/f2e/666_666_1/0a5wvos1c65c7aibuixif911em5yrwt8.jpg',
    ],
    'availableSizes': ['S', 'M', 'L', 'XL', 'XXL'],
    'models': 'northface',
    'status': 'new',
  },
       {
    'id': 14,
    'title': 'Carhartt WIP Chase T-Shirt',
    'price': '6 999',
    'image':
      'https://static.street-beat.ru/upload/resize_cache/iblock/1db/666_666_1/tf3wtszch5up14ygfxvrtvc4w3axv8vd.jpg',
    'description': 'Классические кроссовки в ретро-стиле с удобной амортизацией',
    'category': 'clothing',
    'fulldesc':
      ['Мужская футболка Carhartt WIP Chase T-Shirt выполнена из натурального хлопка. Материал отлично циркулирует воздух. Свободный крой не сковывает движения. Модель дополнена вышитым логотипом бренда.'],
    'photos': [
      'https://static.street-beat.ru/upload/resize_cache/iblock/1db/666_666_1/tf3wtszch5up14ygfxvrtvc4w3axv8vd.jpg',
      'https://static.street-beat.ru/upload/resize_cache/iblock/771/666_666_1/ptrqvouaukzbm8jvxgkrxue4ec9cbgu0.jpg',

     
    ],
    'desc': [
       ' Свободный крой',
'Короткий рукав',
'Спущенная линия плеча'
'Овальный вырез горловины'
'Вышитый логотип бренда'
 
    ],
    'variants': [
      
      
    ],
    'availableSizes': ['S', 'M', 'L', 'XL', 'XXL'],
    'models': 'carhartt',
    'status': 'new',
  },
]

def products_list(request):
    return  JsonResponse({'products': products}, safe=False)
    