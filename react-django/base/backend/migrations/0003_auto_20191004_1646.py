# Generated by Django 2.2.6 on 2019-10-04 06:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20191004_1640'),
    ]

    operations = [
        migrations.RenameField(
            model_name='allocations',
            old_name='product',
            new_name='products',
        ),
    ]