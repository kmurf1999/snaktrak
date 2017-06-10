from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import accounts.views

urlpatterns = [
    url(_(r'^register/$'),
        accounts.views.UserRegisterView.as_view(),
        name='register'),
    url(_(r'^validate/$'),
        accounts.views.UserValidatePhoneView.as_view(),
        name='validate_phone_number'),
    url(_(r'^login/$'),
        accounts.views.UserLoginView.as_view(),
        name='login'),
    url(_(r'^detail/$'),
        accounts.views.UserDetailView.as_view(),
        name='detail')
]
