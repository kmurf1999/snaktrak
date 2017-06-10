from entries.serializers import FoodEntrySerializer, WeightEntrySerializer
from entries.models import FoodEntry, WeightEntry
from accounts.models import User
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

# Create your views here.

class FoodEntryViewSet(ModelViewSet):
    serializer_class = FoodEntrySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return FoodEntry.objects.filter(user=user)


class WeightEntryViewSet(ModelViewSet):
        serializer_class = WeightEntrySerializer
        authentication_classes = (TokenAuthentication,)
        permission_classes = (IsAuthenticated,)

        def get_queryset(self):
            user = self.request.user
            return WeightEntry.objects.filter(user=user)
