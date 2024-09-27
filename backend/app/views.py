from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'POST'])
def message_view(request):
    if request.method == 'POST':
        message = request.data.get('message', '')
        return Response({"message": f"Received: {message}"}, status=status.HTTP_201_CREATED)
    return Response({"message": "Welcome to the API!"}, status=status.HTTP_200_OK)
