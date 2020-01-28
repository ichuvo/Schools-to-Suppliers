from django.urls import reverse, resolve
from backend.api import ProductViewSet, UsersViewSet, TypeViewSet, CategoryViewSet, AllocationViewSet, SubcategoryViewSet, GroupViewSet
from accounts.api import RegisterAPI, LoginAPI, UserAPI
from django.test import TestCase

#import unittest


class TestUrls(TestCase):

    # reverse('api:my_list-list')    # for list URL. e.g. /api/my-list/
    # reverse('api:my_list-detail')  # for detail URL. e.g. /api/my-list/<pk>/

    # besides testing the urls mappings to names also tests the urls mappings to viewSets

    def test_url_users(self):
        url = reverse('users-list')
        assert resolve(url).view_name == "users-list"
        self.assertEquals(resolve(url).func.__name__, UsersViewSet.__name__)
        print(url)

    def test_url_prod(self):
        url = reverse('products-list')
        assert resolve(url).view_name == "products-list"
        self.assertEquals(resolve(url).func.__name__, ProductViewSet.__name__)
        print(resolve(url).func)
        print(url)

    def test_url_groups(self):
        url = reverse('groups-list')
        assert resolve(url).view_name == "groups-list"
        self.assertEquals(resolve(url).func.__name__, GroupViewSet.__name__)
        print(resolve(url).func)
        print(url)

    def test_url_subcat(self):
        url = reverse('subcategories-list')
        assert resolve(url).view_name == "subcategories-list"
        self.assertEquals(resolve(url).func.__name__,
                          SubcategoryViewSet.__name__)

    def test_url_types(self):
        url = reverse('types-list')
        assert resolve(url).view_name == "types-list"
        self.assertEquals(resolve(url).func.__name__, TypeViewSet.__name__)
        print(url)

    def test_url_cat(self):
        url = reverse('categories-list')
        assert resolve(url).view_name == "categories-list"
        self.assertEquals(resolve(url).func.__name__, CategoryViewSet.__name__)
        print(url)

    def test_url_alloc(self):
        url = reverse('allocations-list')
        assert resolve(url).view_name == "allocations-list"
        self.assertEquals(resolve(url).func.__name__,
                          AllocationViewSet.__name__)
        print(url)

    # path('api/auth/register', RegisterAPI.as_view(), name= 'knox_register'),
    # path('api/auth/login', LoginAPI.as_view(), name='knox_login'),
    # path('api/auth/user', UserAPI.as_view(), name='knox_user'),
    # path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),

    def test_url_register(self):
        url = reverse('knox_register')
        assert resolve(url).view_name == "knox_register"
        self.assertEquals(resolve(url).func.__name__, RegisterAPI.__name__)
        print(url)

    def test_url_login(self):
        url = reverse('knox_login')
        assert resolve(url).view_name == "knox_login"
        self.assertEquals(resolve(url).func.__name__, LoginAPI.__name__)
        print(url)

    def test_url_users_auth(self):
        url = reverse('knox_user')
        assert resolve(url).view_name == "knox_user"
        self.assertEquals(resolve(url).func.__name__, UserAPI.__name__)
        print(url)

    #  def test_url_types(self):
    #      url = reverse('knox_logout')
    #      assert resolve(url).view_name == "knox_logout"
    #      self.assertEquals(resolve(url).func.__name__, LogoutView.__name__)
    #      print(url)
