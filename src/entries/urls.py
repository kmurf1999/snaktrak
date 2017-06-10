from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

from entries.views import WeightEntryViewSet, FoodEntryViewSet

FoodEntry_list = FoodEntryViewSet.as_view({
    'get': 'list'
})
FoodEntry_detail = FoodEntryViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

WeightEntry_list = WeightEntryViewSet.as_view({
    'get': 'list'
})
WeightEntry_detail = WeightEntryViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})


urlpatterns = [
    url(_(r'^FoodEntry/$'), FoodEntry_list, name='food-list'),
    url(_(r'^FoodEntry/(?P<pk>[0-9]+)/$'), FoodEntry_detail, name='food-detail'),

    url(_(r'^WeightEntry/$'), WeightEntry_list, name='weight-list'),
    url(_(r'^WeightEntry/(?P<pk>[0-9]+)/$'), WeightEntry_detail, name='weight-detail'),    
]
