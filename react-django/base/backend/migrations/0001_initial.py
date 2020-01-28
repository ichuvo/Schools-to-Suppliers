# Generated by Django 2.2.6 on 2019-10-04 05:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(
                    max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(
                    blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('institute', models.CharField(max_length=100, null=True)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('contact_number', models.CharField(max_length=10, null=True)),
                ('address', models.CharField(max_length=100, null=True)),
                ('suburb', models.CharField(max_length=50, null=True)),
                ('postcode', models.CharField(max_length=4, null=True)),
                ('institute_size', models.CharField(max_length=20, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subcategory',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60, unique=True)),
                ('parent_category', models.ForeignKey(
                    null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('picture', models.ImageField(
                    blank=True, default='', upload_to='picture')),
                ('documentation', models.FileField(
                    blank=True, default='', upload_to='documentation')),
                ('price', models.DecimalField(
                    decimal_places=2, max_digits=6, null=True)),
                ('quantity', models.IntegerField(null=True)),
                ('brand', models.TextField(max_length=100, null=True)),
                ('category', models.ForeignKey(
                    null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.Category')),
                ('type', models.ForeignKey(
                    null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.Type')),
            ],
        ),
        migrations.CreateModel(
            name='Allocations',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateField(auto_now_add=True)),
                ('quantity', models.IntegerField(null=True)),
                ('product', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='backend.Product')),
                ('user', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='group',
            field=models.ForeignKey(
                blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.Group'),
        ),
    ]
