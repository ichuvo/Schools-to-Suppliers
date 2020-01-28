from django.shortcuts import render

# Create your views here.

"""
no touchy touchy
This is what actually loads the HTML, which is in turn what loads React.
- Alex
"""


def index(request):
    return render(request, 'frontend/index.html')
