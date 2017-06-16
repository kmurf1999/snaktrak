from django.shortcuts import get_object_or_404
from django_rest_logger import log
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import GenericAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from accounts.serializers import UserRegistrationSerializer, UserSerializer
from lib.utils import AtomicMixin

from random import randint

#from accounts.utils import sendSMS
class UserRegisterView(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = UserRegistrationSerializer
    authentication_classes = ()

    def post(self, request):
        """User registration view."""
        return self.create(request)


from accounts.utils import sendSMS
class UserValidatePhoneView(GenericAPIView):
    serializer_class = None
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        """User sends a key which is then checked against the key saved in the server
        if the keys match, then the phone number is validated"""
        phone_validation_key = int(request.data['phone_validation_key'])
        user = request.user
        if user.phone_validation_key == phone_validation_key:
            user.confirmed_phone_number = True
            user.save()
            return Response({
            'status': user.confirmed_phone_number},
            status=status.HTTP_200_OK
            )

        return Response({
        'status': user.confirmed_phone_number},
         status=status.HTTP_404_NOT_FOUND
         )

    def get(self, request):
        user = request.user
        if not user.confirmed_phone_number:
            user.phone_validation_key = randint(100000, 999999)
            user.save()
            sendSMS(user.phone_number, user.phone_validation_key)
            return Response({
                'status': 'activation key changed'
                })
        else:
            return Response({
                'status': 'Phone number has already been validated'
            })
        return Response(status=status.HTTP_404_NOT_FOUND)
        """Change the key and send the user a new key with twilio"""



class UserLoginView(GenericAPIView):
    serializer_class = UserSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """User login with username and password."""
        token = AuthToken.objects.create(request.user)
        return Response({
            'user': self.get_serializer(request.user).data,
            'token': token
        })


class UserDetailView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user
