from django.conf.urls import url

from base import views as base_views

urlpatterns = [
    url(r'webhook/',
        base_views.WebhookView.as_view(),
        name='webhook')
]
