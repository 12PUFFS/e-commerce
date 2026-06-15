from django.db import models

class Product(models.Model):
    STATUSES = [
        # ('all', 'Все'),
        ('new', 'Новинки'),
        ('hit', 'Хиты')
        ]

    status = models.CharField(choices=STATUSES)

    CATEGORY = [
        # ('all', 'Все'),
        ('shoes', 'Кроссовки'),
        ('clothing', 'Куртки'),
        ('Pant', 'Джинсы'),
        ('T-Shirt', 'Футболки'),
        ('hudi', 'Худи')
    ]

    category = models.CharField(choices=CATEGORY)

    GENDER = [
        # ('all', 'Все'),
        ('man', 'Мужчины'),
        ('woman', 'Женщины'),
    ]

    gender = models.CharField(choices=GENDER)

    BRAND = [
        # ('all', 'Все'),
        ('adidas', 'Adidas'),
        ('nike', 'Nike'),
        ('the north face', 'The North Face'),
        ('carhartt', 'Carhartt')
    ]

    brand = models.CharField(choices=BRAND)

    title = models.CharField(max_length=300)
    price = models.IntegerField()
    image = models.JSONField(max_length=500)
    description = models.CharField(max_length=300)
    fulldesc = models.TextField()
    # rating = models.IntegerField()
    photos = models.JSONField(default=list)
    desc = models.JSONField(default=list)
    variants = models.JSONField(default=list)
    availableSizes = models.JSONField(default=list)
    models_name = models.CharField(max_length=300, blank=True, null=True)


    @property
    def formatted_price(self):
            price_str = str(self.price)
            if len(price_str) <= 3:
                return price_str
            return f'{price_str[:-3]} {price_str[-3:]}'



    def __str__(self):
            return self.title