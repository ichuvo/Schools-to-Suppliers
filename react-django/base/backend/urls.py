from rest_framework import routers

from .api import UsersViewSet, ProductViewSet, ReviewViewSet, TypeViewSet, CategoryViewSet, AllocationViewSet, SubcategoryViewSet, GroupViewSet, MultiProductViewSet


"""
Automatically routes API endpoints and sets up the relevant methods for accepting POST/GET/ETC requets
Ideally don't touch this without first consulting the rest of us since it H E C K S things up
-Alex
"""

router = routers.DefaultRouter()
router.register('api/users', UsersViewSet, base_name='users')
router.register('api/products', ProductViewSet, base_name='products')
router.register('api/multiproduct', MultiProductViewSet)
router.register('api/types', TypeViewSet, base_name='types')
router.register('api/categories', CategoryViewSet, base_name='categories')
router.register('api/reviews', ReviewViewSet, base_name='reviews')
router.register('api/allocations', AllocationViewSet, base_name='allocations')
router.register('api/subcategories', SubcategoryViewSet,
                base_name='subcategories')
router.register('api/groups', GroupViewSet, base_name='groups')

"""
Above creates:
api/user/ (GET, POSt)
api/users/{methodname} (GET)
api/users/{lookup} (GET, PUT, PATCH, DELETE)
api/users/{lookup}/{methodname} (GET)

example, DELETE api/users/3 will delete the entry with ID 3 in users
- Alex
"""
urlpatterns = router.urls
