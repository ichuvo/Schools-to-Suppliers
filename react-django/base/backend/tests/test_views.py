from django.urls import reverse, resolve
from backend.api import ProductViewSet, UsersViewSet, TypeViewSet, CategoryViewSet, AllocationViewSet, GroupViewSet
from backend.factories import UserF
from backend.models import User, UserManager, Group
from accounts.api import LoginAPI, RegisterAPI

from rest_framework.test import APIClient, APITestCase

from rest_framework.test import APIRequestFactory
from django.test import RequestFactory, TestCase
from django.http import HttpRequest
import json


class TestViews(APITestCase):

    def setUp(self):
       #  self.user = UserF()
        self.client = APIClient()
       #  self.my_login = LoginAPI()
        self.factory = RequestFactory()
        self.loginUrl = reverse('knox_login')
        self.productUrl = reverse('products-list')
        self.userURl = reverse('users-list')

        # umObj = UserManager()  
        self.umObj = UserManager() 
        self.umObj.model = User

        self.groupObject = GroupViewSet()
        # self.groupObject.model = Group 

        # self.group = self.groupObject.perform_create()
        # set up users for testing. 

        

        # self.user = self.umObj.create_user(
        #     email='ichu8086@uni.sydney.edu.au', password="pass", institute="some Institute", contact_number="0420503598", institute_size="4000", address="Village on a hill", suburb="Annanduleee", postcode="2020", group="10")
        
        self.user = self.umObj.create_superuser(
            email='ichu8086@uni.sydney.edu.au', password="pass")



        response = self.client.post(self.loginUrl, data={
                                    "email": "ichu8086@uni.sydney.edu.au", "password": "pass"})
        ret = json.loads(response.content.decode('utf-8'))
       #  print(ret[0]['email']) # doesnt work. depends on what api returns.
       #  print(ret['token'])

        self.token = ret['token']


#  def test_view_get_products(self):
#      client = Client()
#      url = reverse('products-list')
#      response = self.client.get(url)
#      print(response.get_full_path_info)
#      self.assertTemplateUsed(response, 'products.html')


    def test_login(self):
       #  self.client.user = self.user
       #  factory = APIRequestFactory()

       #  my_login = LoginAPI()
       #  request = self.factory.get(userUrl)
       # #  request = factory.post(url, json.dumps({"email": "ichu8086@uni.sydney.edu.au", "password": "pass1"}), content_type='application/json')
       #  request.user = self.user
       #  response = UsersViewSet.as_view('get':'list')(request)

       #  print(request)
       #  print(response)

       #  self.user = User.objects.create_user(username='testuser', password='12345')
       #  umObj = UserManager()
       #  umObj.model = User
       #  self.user = umObj.create_user(email='ichu8086@uni.sydney.edu.au', password= "pass")

       #  request = factory.post(url, json.dumps({"email": "ichu8086@uni.sydney.edu.au", "password": "pass1"}), content_type='application/json')

        response = self.client.post(self.loginUrl, data={
                                    "email": "extraichu8086@uni.sydney.edu.au", "password": "pass"})
        self.assertEquals(response.status_code, 400)

        response = self.client.post(self.loginUrl, data={
                                    "email": "ichu8086@uni.sydney.edu.au", "password": "pass"})

       #  response = self.client.post(reverse('knox_register'),
       #                                 data={'username': 'bob',
       #                                       'email1': 'bobe@example.com',
       #                                       'email2': 'mark@example.com'})

        self.assertEquals(response.status_code, 200)

       #  response = self.client.get(url)
        # server has method but it is not allowed
       #  data = {
        #         "email": "ichu8086@uni.sydney.edu.au",
        #         "password": "pass1"
       #  }
       #  self.client.post(url, data)
       #  #self.assertEquals(response.status_code, 905)
       #  print(self.client.post(url, data) )
       #  #print(response.json()['token'])
       #  print(url)

    def test_view_users(self):
        response = self.client.get(self.userURl)
        self.assertEquals(response.status_code, 401)  # checking authorization

       #  self.user = self.umObj.create_superuser(email='ichu8086@uni.sydney.edu.au', password = 'pass')
       #  self.user.set_password('pass')
       #  self.user.save()
       #  response = self.client.post(self.loginUrl, data = {"email": "ichu8086@uni.sydney.edu.au", "password": "pass"})
       #  ret = json.loads(response.content.decode('utf-8'))
       #  print(ret['token'])

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

       #  login = self.client.login(username = "ichu8086@uni.sydney.edu.au", password = "pass")
       #  print ((self.client.login(username = "ichu8086@uni.sydney.edu.au", password = "pass")) == True)
       #  print(dir(login))

        response = self.client.get(self.userURl)
        self.assertEquals(response.status_code, 200)  # checking authorization

    def test_view_porduct(self):
       #  url = reverse('products-list')
        response = self.client.get(self.productUrl)
        self.assertEquals(response.status_code, 401)  # checking authorization

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

        response = self.client.get(self.productUrl)
        self.assertEquals(response.status_code, 200)  # checking authorization

    def test_view_types(self):
        url = reverse('types-list')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 401)  # checking authorization

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)  # checking authorization

    def test_view_cat(self):
        url = reverse('categories-list')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 401)  # checking authorization

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)  # checking authorization

    def test_view_aclloc(self):
        url = reverse('allocations-list')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 401)  # checking authorization

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)  # checking authorization

    def test_create_and_view_type(self):
        url = reverse('types-list')
        response = self.client.post(url, data={"name": "someType"})
        self.assertEquals(response.status_code, 401)  # checking authorization

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

        response = self.client.post(url, data={"name": "someType"})
        self.assertEquals(response.status_code, 201)  # checking creation code.

        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        ret = json.loads(response.content)
       #  print(ret[0]["name"])
        # serializer.data always gives an array back
        self.assertEquals(ret[0]["name"], "someType")

        url = reverse('types-detail', kwargs={'pk': ret[0]["id"]})
        response = self.client.delete(url)
        self.assertEquals(response.status_code, 204)

        url = reverse('types-list')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        ret = json.loads(response.content)

        self.assertEquals(ret, [])

    def test_create_and_view_and_destroy_category(self):
        url = reverse('categories-list')
        response = self.client.post(url, data={"name": "someCategory"})
        self.assertEquals(response.status_code, 401)  # checking authorization

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

        response = self.client.post(url, data={"name": "someCategory"})
        self.assertEquals(response.status_code, 201)  # checking creation code.

        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        ret = json.loads(response.content)
        # print(ret[0]["name"])
        # print(ret[0]["id"])
        # serializer.data always gives an array back
        self.assertEquals(ret[0]["name"], "someCategory")

        url = reverse('categories-detail', kwargs={'pk': ret[0]["id"]})
        response = self.client.delete(url)
        # checking deletion code.
        self.assertEquals(response.status_code, 204)

        url = reverse('categories-list')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        ret = json.loads(response.content)

        self.assertEquals(ret, [])

    def test_create_and_view_and_destroy_product(self):
        url = reverse('products-list')
        response = self.client.post(url, data={"name": "someProduct", "subcategory": "", "description": "some description", "type": "1",
                                               "category": "1", "price": "50", "brand": "some brand", "quantity": "3", "picture": "None", "documentation": "None"})
        self.assertEquals(response.status_code, 401)  # checking authorization

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

        # response = self.client.post(
        #     reverse('types-list'), data={"name": "someType"})
        # response = self.client.post(
        #     reverse('categories-list'), data={"name": "someCategory"})

        response = self.client.post(url, data={"name": "someProduct", "subcategory": "", "description": "some description", "type": "someType",
                                               "category": "someCategory", "price": "50", "brand": "some brand", "quantity": "3", "picture": "None", "documentation": "None"})
        self.assertEquals(response.status_code, 200)  # checking creation code.
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        ret = json.loads(response.content)


        # print("ret is ", ret[0]["type"][0]["name"])



        self.assertEquals(ret[0]["name"], "someProduct")
        self.assertEquals(ret[0]["description"], "some description")
        self.assertEquals(ret[0]["type"][0]["name"], "someType")
        self.assertEquals(ret[0]["category"]["name"], "someCategory")
        self.assertEquals(ret[0]["price"], '50.00')
        self.assertEquals(ret[0]["brand"], "some brand")
        self.assertEquals(ret[0]["quantity"], 3)


        # url = reverse('allocations-detail', )

        # checking deletion code.
        url = reverse('products-detail', kwargs={'pk': ret[0]["id"]})
        response = self.client.delete(url)
        self.assertEquals(response.status_code, 204)

        url = reverse('products-list')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        ret = json.loads(response.content)

        self.assertEquals(ret, [])

    def test_create_view_delete_allocations(self):
        url = reverse('products-list')

        response = self.client.post(reverse("groups-list"), data = {"name": "someGroup"})
        self.assertEquals(response.status_code, 401)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

        #Authorization test above. 

        #Setting up databse for the testing: 

        response = self.client.post(reverse("groups-list"), data = {"name": "someGroup"})
        self.assertEquals(response.status_code, 201)
        ret = json.loads(response.content)
        GroupId0 = ret["id"]
        print("id for group is ", ret)
        
        
        data = {
                "email":'someEmail@uni.sydney.edu.au', 
                "password":"pass",
                "institute":"some Institute",
                "contact_number":"0420503598", 
                "institute_size":"4000",
                "address":"Village on a hill",
                "suburb":"Annanduleee", 
                "postcode":"2020",
                "group": ret["name"]
        }

        response = self.client.post(reverse("users-list"), json.dumps(data), content_type="application/json")
        self.assertEquals(response.status_code, 201)
        retUser0 = json.loads(response.content)
        print(" tzero 2 user ", retUser0)
        print("......................................................................................")
        response = self.client.post(reverse("users-list"), data = { "email":'someEmailNumber2@uni.sydney.edu.au', "password":"pass", "institute":"some Institute 2", "contact_number":"0420503598", "institute_size":"2000", "address":"Village on a hill", "suburb":"Annanduleee", "postcode":"2020", "group": GroupId0})
        self.assertEquals(response.status_code, 201)
        retUser1 = json.loads(response.content)
        response = self.client.post(reverse("users-list"), data = { "email":'someEmailNumber3@uni.sydney.edu.au', "password":"pass", "institute":"some Institute 3", "contact_number":"0420503598", "institute_size":"3000", "address":"Village on a hill", "suburb":"Annanduleee", "postcode":"2020", "group": GroupId0})
        self.assertEquals(response.status_code, 201)
        retUser2 = json.loads(response.content)

        response = self.client.post(reverse("groups-list"), data = {"name": "someOtherGroup"})
        self.assertEquals(response.status_code, 201)
        ret = json.loads(response.content)
        GroupId1 = ret["id"]

        response = self.client.post(reverse("users-list"), data = { "email":'SomeOterGroupUser1@uni.sydney.edu.au', "password":"pass", "institute":"some Other group Institute 2", "contact_number":"0420503598", "institute_size":"2000", "address":"Village on a hill", "suburb":"Annanduleee", "postcode":"2020", "group":GroupId1})
        self.assertEquals(response.status_code, 201)
        retUser3 = json.loads(response.content)
        response = self.client.post(reverse("users-list"), data = { "email":'SomeOtherGroupUser2@uni.sydney.edu.au', "password":"pass", "institute":"some Other group Institute 3", "contact_number":"0420503598", "institute_size":"3000", "address":"Village on a hill", "suburb":"Annanduleee", "postcode":"2020", "group": GroupId1})
        self.assertEquals(response.status_code, 201)
        retUser4 = json.loads(response.content)


        response = self.client.post(url, data={"name": "someOtherProduct",  "subcategory": "", "description": "some other description", "type": "someOtherType",
                                               "category": "someOtherCategory", "price": "540", "brand": "some other brand", "quantity": "40", "picture": "None", "documentation": "None"})
        self.assertEquals(response.status_code, 200)
        retProduct0 = json.loads(response.content)

        response = self.client.post(url, data={"name": "someProduct",  "subcategory": "", "description": "some description", "type": "someType",
                                               "category": "someCategory", "price": "50", "brand": "some brand", "quantity": "50", "picture": "None", "documentation": "None"})
        self.assertEquals(response.status_code, 200)
        retProduct1 = json.loads(response.content)
        # print("product 1: ", response.content.decode('utf-8'))

        # end of the set up and begining of the actual testing:
        product_array = [retProduct1["id"], retProduct0["id"]]
    
        data = {
                "quantity": 60,
                "type": 0,
                "product":  product_array,
                "user": retUser0["id"],
                "message": "i dont know some message?"
        }
        # print(" array ", product_array)
        response = self.client.post(reverse("allocations-list") , json.dumps(data), content_type="application/json")
        self.assertEquals(response.status_code, 400)

        data = {
                "quantity": 10,
                "type": 0,
                "product":  product_array,
                "user": retUser0["id"],
                "message": "i dont know some message?"
        }
        # print(" array ", product_array)
        response = self.client.post(reverse("allocations-list") , json.dumps(data), content_type="application/json")
        self.assertEquals(response.status_code, 200)
        ret = json.loads(response.content)
        AllocId = ret["id"]

        
        data = {
                "quantity": 31,
                "type": 0,
                "product":  product_array,
                "user": retUser0["id"],
                "message": "i dont know some message?"
        }
        # print(" array ", product_array)
        response = self.client.post(reverse("allocations-list") , json.dumps(data), content_type="application/json")
        self.assertEquals(response.status_code, 400)



        response = self.client.delete(reverse("allocations-detail", kwargs={'pk': AllocId }))
        self.assertEquals(response.status_code, 204)


        data = {
                "quantity": 160,
                "type": 1,
                "product":  product_array,
                "group": GroupId0,
                "message": "i dont know some message?"
        }
        print("retUser0 ", retUser0)
        response = self.client.post(reverse("allocations-list") , json.dumps(data), content_type="application/json")
        self.assertEquals(response.status_code, 200)

        # # running tests for allocations of type 1 with groups: 
        # response = self.client.post(reverse("allocations-list"), data = {"quantity" : "35", "type": "1",  "product":  retProduct1["id"], "group": GroupId0} )
        # self.assertEquals(response.status_code, 200)

        # response = self.client.post(reverse("allocations-list"), data = {"quantity" : "0", "type": "1",  "product":  retProduct1["id"], "group": GroupId0} )
        # self.assertEquals(response.status_code, 400)


