from django.shortcuts import render
from django.http import HttpResponse


# index view (called by urls)
def index(request):
    return render(request, 'pages/index.html')

def loggedin(request):
    return render(request, 'pages/loggedin.html')