import os

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from entries.models import FoodEntry, WeightEntry
from django.shortcuts import get_object_or_404
from base.utils import get_nutrition
import re

class IndexView(View):
    """Render main page."""

    def get(self, request):
        """Return html for main application page."""

        abspath = open(os.path.join(settings.BASE_DIR, 'static_dist/src.html'), 'r')
        return HttpResponse(content=abspath.read())


class WebhookView(GenericAPIView):
    """ recieve inbound sms """

    def post(self, request):
        data = request.data
        user = get_object_or_404(User, phone_number=data['msisdn'])
        query = data['text']

        if user.confirmed_phone_number:
            if re.search(r'(lbs)|(weight)|(weighed)|(^\s*\d+\.?\d*\s*$)', query):
                #weight entry
                weight = re.findall(r'\d+\.?\d*', query)[0]
                WeightEntry.objects.create_entry(float(weight), user)
            else:
                nutrition = get_nutrition(query)
                for item in nutrition:
                    FoodEntry.objects.create_entry(item, user)

        return Response(data, status=status.HTTP_200_OK)


class ProtectedDataView(GenericAPIView):
    """Return protected data main page."""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Process GET request and return protected data."""

        data = {
            'data': 'THIS IS THE PROTECTED STRING FROM SERVER',
        }

        return Response(data, status=status.HTTP_200_OK)
