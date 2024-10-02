from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer, SignupSerializer
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.decorators import api_view
import requests
import datetime
from .services import CarbonDataService
import requests
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.conf import settings


@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'Login successful!',
            'token': token.key,
            'email': user.email,
        }, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup_view(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'Signup successful!',
            'token': token.key,
            'email': user.email,
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def message_view(request):
    if request.method == 'POST':
        message = request.data.get('message', '')
        print(message)
        return Response({"message": f"Received: {message}"}, status=status.HTTP_201_CREATED)
    return Response({"message": "Welcome to the API!"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def carbon_data_view(request):
    try:
        service = CarbonDataService()
        data = service.get_carbon_data()
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# @api_view(['GET']) # Optional: if you want to require authentication
# def carbon_data_view(request):
#     try:
#         service = CarbonDataService()
#         data = service.get_carbon_data()
#         print(data)
#         return Response(data, status=status.HTTP_200_OK)
#     except Exception as e:
#         return Response(
#             {'error': str(e)},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )




##**********************TM5-4DVar Isotopic CH₄ Inverse Fluxes***************************

import requests
from django.http import JsonResponse
from rest_framework.decorators import api_view

# STAC and Raster API URLs
STAC_API_URL = "https://earth.gov/ghgcenter/api/stac"
RASTER_API_URL = "https://earth.gov/ghgcenter/api/raster"

# Collection name for TM5 CH₄ inverse flux dataset
collection_name = "tm54dvar-ch4flux-monthgrid-v1"
asset_name = "fossil"

# Function to get the item count for the collection
def get_item_count(collection_id):
    count = 0
    items_url = f"{STAC_API_URL}/collections/{collection_id}/items"
    while True:
        response = requests.get(items_url)
        if not response.ok:
            print("Error getting items")
            break
        stac = response.json()
        count += int(stac["context"].get("returned", 0))
        next_links = [link for link in stac["links"] if link["rel"] == "next"]
        if not next_links:
            break
        items_url = next_links[0]["href"]
    return count

# Function to get the CH₄ flux for the given year and asset
def get_ch4_flux(item, color_map, rescale_values):
    response = requests.get(
        f"{RASTER_API_URL}/collections/{item['collection']}/items/{item['id']}/tilejson.json?"
        f"&assets={asset_name}"
        f"&color_formula=gamma+r+1.05&colormap_name={color_map}"
        f"&rescale={rescale_values['min']},{rescale_values['max']}"
    )
    return response.json()

@api_view(["GET"])
def carbon_data_view_CH4(request):
    print("got here")
    # Fetch the total number of items in the collection
    number_of_items = get_item_count(collection_name)
    items_response = requests.get(f"{STAC_API_URL}/collections/{collection_name}/items?limit={number_of_items}")

    if not items_response.ok:
        return JsonResponse({"error": "Error fetching items from STAC API"}, status=500)

    items = items_response.json()["features"]

    # Map the items with their start date
    items_dict = {item["properties"]["start_datetime"][:10]: item for item in items}

    # Fetch rescale values from the 2016 data
    rescale_values = {
        "max": items_dict["2016-12-01"]["assets"][asset_name]["raster:bands"][0]["histogram"]["max"],
        "min": items_dict["2016-12-01"]["assets"][asset_name]["raster:bands"][0]["histogram"]["min"]
    }

    # Colormap
    color_map = "purd"

    # Fetch CH₄ flux data for 2016 and 1999
    ch4_flux_1 = get_ch4_flux(items_dict['2016-12-01'], color_map, rescale_values)
    ch4_flux_2 = get_ch4_flux(items_dict['1999-12-01'], color_map, rescale_values)

    # Prepare other metadata and add features if needed (like additional visualization params)
    print("got here2")
    # Return the response to React with both datasets
    return JsonResponse({
        "ch4_flux_1": ch4_flux_1,
        "ch4_flux_2": ch4_flux_2,
        "rescale_values": rescale_values,
        "metadata": {
            "collection_name": collection_name,
            "total_items": number_of_items,
            "asset_name": asset_name,
            "color_map": color_map,
            "description": "CH₄ Flux Data Comparison for 2016 and 1999"
        }
    })

