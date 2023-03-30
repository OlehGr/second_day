from flats.views import ProjectCreateView, ProjectDetailView, HouseCreateView, HouseDetailView, SectionCreateAPIView, \
    SectionDetailView, mass_flats_update, HouseFlatsAPIView, FlatUpdateView

from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('project', ProjectCreateView.as_view()),
    path('project/<int:pk>', ProjectDetailView.as_view()),
    path('house', HouseCreateView.as_view()),
    path('house/<int:pk>', HouseDetailView.as_view()),
    path('house/<int:pk>/flats', HouseFlatsAPIView.as_view()),
    path('section', SectionCreateAPIView.as_view()),
    path('section/<int:pk>', SectionDetailView.as_view()),
    path('flat', mass_flats_update),
    path('flat/<int:pk>', FlatUpdateView.as_view())
]
