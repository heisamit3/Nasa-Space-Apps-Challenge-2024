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
import json
import pandas as pd
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import SignupSerializer
from .models import User, Profile, Story, Alert
from django.shortcuts import get_object_or_404



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
    print("Request Data:", request.data)  # Print received data
    serializer = SignupSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        profile = Profile.objects.get(user=user)
        print("New User Created:")
        print(f"Username: {user.username}")
        print(f"Email: {user.email}")
        print("Profile Details:")
        print(f"Full Name: {profile.full_name}")
        print(f"City: {profile.city}")
        print(f"Phone Number: {profile.phone_number}")
        print(f"password: {user.password}")
        return Response({"message": "Signup successful"}, status=status.HTTP_201_CREATED)
    
    print("Serializer Errors:", serializer.errors)  # Print validation errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def message_view(request):
    if request.method == 'POST':
        message = request.data.get('message', '')
        print(message)
        return Response({"message": f"Received: {message}"}, status=status.HTTP_201_CREATED)
    return Response({"message": "Welcome to the API!"}, status=status.HTTP_200_OK)


from .models import User, Profile  # Import your User and Profile models
from .serializers import ProfileSerializer  # Import the serializer for your Profile model

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Profile

@csrf_exempt  # Temporarily disable CSRF for simplicity (consider security implications)
def userprofile_view(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)  # Load the JSON request body
            email = body.get('email')  # Get the email from the body
            print("email : ",email)
            if not email:
                return JsonResponse({'error': 'Email parameter is required.'}, status=400)

            profile = Profile.objects.get(user__email=email)
            #print the profile
            print("for get profile           ************************")
            print("New User Created:")
            print(f"Email: {profile.user.email}")
            print("Profile Details:")
            print(f"Full Name: {profile.full_name}")
            print(f"City: {profile.city}")
            print(f"Phone Number: {profile.phone_number}")
            #   # Fetch profile based on email
            return JsonResponse({
                'full_name': profile.full_name,
                'city': profile.city,
                'phone_number': profile.phone_number,
                'email': profile.user.email,
            }, status=200)  # Return user profile data as JSON

        except Profile.DoesNotExist:
            return JsonResponse({'error': 'Profile not found.'}, status=404)  # Return error if profile not found
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)  # Return error for invalid JSON

    return JsonResponse({'error': 'Method not allowed.'}, status=405)  # Handle unsupported methods
    
@csrf_exempt
def getstories_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        
        # Get the user's profile based on email
        profile = get_object_or_404(Profile, user__email=email)
        
        # Get the city of the user
        city = profile.city
        
        # Fetch all stories from the user's city
        stories = Story.objects.filter(city=city)
        
        # Prepare the response data
        stories_data = [
            {
                'profile_name': story.profile.full_name,
                'text': story.text,
                'city': story.city
            } for story in stories
        ]
        
        return JsonResponse({'stories': stories_data}, status=200)
    
# Function to create a story for a user
@csrf_exempt
def setstory_view(request):
    if request.method == 'POST':
        print("huhu")
        data = json.loads(request.body)
        email = data.get('email')
        text = data.get('text')
        print("huhu")
        # Get the profile from the email
        profile = get_object_or_404(Profile, user__email=email)
        
        # Create a new story for the profile
        story = Story.objects.create(profile=profile, text=text, city=profile.city)
        
        return JsonResponse({'message': 'Story created successfully!'}, status=201)
# Function to get all alerts for a user's city
@csrf_exempt
def get_alerts(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        
        # Get the user's profile based on email
        profile = get_object_or_404(Profile, user__email=email)
        
        # Get the city of the user
        city = profile.city
        
        # Fetch all alerts for the user's city, excluding alerts created by the user
        alerts = Alert.objects.filter(city=city).exclude(sender__user__email=email)
        
        # Prepare the response data
        alerts_data = [
            {
                'sender_name': alert.sender.full_name,
                'text': alert.text,
                'city': alert.city
            } for alert in alerts
        ]
        
        return JsonResponse({'alerts': alerts_data}, status=200)

# Function to create an alert and assign it to all profiles in the sender's city
@csrf_exempt
def set_alert(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        text = data.get('text')
        
        # Get the sender's profile based on email
        sender_profile = get_object_or_404(Profile, user__email=email)
        
        # Create a new alert for the sender's city
        alert = Alert.objects.create(sender=sender_profile, text=text, city=sender_profile.city)
        
        # Get all profiles in the sender's city and associate them with the alert
        profiles_in_city = Profile.objects.filter(city=sender_profile.city)
        alert.profiles.set(profiles_in_city)
        
        return JsonResponse({'message': 'Alert created and assigned to all users in the city!'}, status=201)
    
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




# # Function to generate statistics for a specific granule
# def generate_stats(item, geojson):
#     result = requests.post(
#         f"{RASTER_API_URL}/cog/statistics",
#         params={"url": item["assets"][asset_name]["href"]},
#         json=geojson,
#     ).json()
    
#     return {
#         **result["properties"],
#         "datetime": item["properties"]["start_datetime"][:10],
#     }

# # Function to clean stats into a DataFrame
# def clean_stats(stats_json) -> pd.DataFrame:
#     df = pd.json_normalize(stats_json)
#     df.columns = [col.replace("statistics.b1.", "") for col in df.columns]
#     df["date"] = pd.to_datetime(df["datetime"])
#     return df

# @csrf_exempt
# def compute_stats(request):
#     print("got here")
#     if request.method == 'POST':
#         # Parse the incoming request data
#         data = json.loads(request.body)
        
#         # Area of interest (AOI) received from frontend, must be in correct GeoJSON format
#         aoi = data.get("aoi", None)
#         if not aoi:
#             return JsonResponse({"error": "Invalid area of interest"}, status=400)

#         # Fetch items from STAC API
#         items = requests.get(
#             f"{STAC_API_URL}/collections/{collection_name}/items?limit=600"
#         ).json()["features"]

#         # Generate statistics for each item using the specified region (AOI)
#         stats = [generate_stats(item, aoi) for item in items]
        
#         # Clean the statistics into a Pandas DataFrame
#         df = clean_stats(stats)

#         # Convert DataFrame to JSON to send back to React
#         df_json = df.to_json(orient='records', date_format='iso')

#         return JsonResponse({"data": df_json}, safe=False)

#     return JsonResponse({"error": "Invalid request method"}, status=400)
from rest_framework.decorators import api_view
from django.http import JsonResponse

@api_view(["POST"])
def carbon_data_stats_CH4(request):
    # Parse the incoming request data
    data = request.data
    aoi = data.get("aoi", None)
    
    if not aoi:
        print("Invalid area of interest")
        return JsonResponse({"error": "Invalid area of interest"}, status=400)

    # Extract latitude and longitude from the GeoJSON
    coordinates = aoi['features'][0]['geometry']['coordinates']
    lng, lat = coordinates

    # Print latitude and longitude
    print(f"Latitude: {lat}, Longitude: {lng}")

    # Send back the center coordinates and the radius
    return JsonResponse({
        "message": "Received latitude and longitude",
        "lat": lat,
        "lng": lng,
        "radius": 5000,  # Radius in meters
    }, status=200)
    
    
    
    
# Function to generate statistics for a specific granule****************************************

# Function to generate the AOI (Area of Interest)

from rest_framework.decorators import api_view
from django.http import JsonResponse
import json
import pandas as pd
import requests

# Constants
STAC_API_URL = "https://earth.gov/ghgcenter/api/stac"
RASTER_API_URL = "https://earth.gov/ghgcenter/api/raster"
collection_name = "tm54dvar-ch4flux-monthgrid-v1"

def create_aoi(coordinates):
    return {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [coordinates],
        },
    }



def fetch_stac_items(collection_name, start_year=1999, end_year=2024, limit=1):
    all_items = []
    
    for year in range(start_year, end_year + 1):
        # Define the datetime range for the specific year
        datetime_range = f"{year}-01-01T00:00:00Z/{year}-12-31T23:59:59Z"
        
        # Construct the URL with the correct query parameter syntax
        response = requests.get(f"{STAC_API_URL}/collections/{collection_name}/items?limit={limit}&datetime={datetime_range}")
        
        # Check if the response was successful
        response.raise_for_status()  # Raises an HTTPError if the response code is 4XX or 5XX
        
        # Parse the JSON response
        items = response.json()["features"]
        all_items.extend(items)
        print(f"Found {len(items)} items for year {year}")
    
    print(f"Total items found: {len(all_items)}")
    return all_items

def generate_stats(item, geojson, asset_name):
    try:
        result = requests.post(
            f"{RASTER_API_URL}/cog/statistics",
            params={"url": item["assets"][asset_name]["href"]},
            json=geojson,
        ).json()
        
        return {
            **result["properties"],
            "datetime": item["properties"]["start_datetime"][:10],
        }
    except Exception as e:
        print(f"Error generating stats: {str(e)}")
        return None

def clean_stats(stats_json):
    if not stats_json:
        return pd.DataFrame()  # Return empty DataFrame if no stats
    
    df = pd.DataFrame(stats_json)
    if 'statistics.b1.' in df.columns[0]:
        df.columns = [col.replace("statistics.b1.", "") for col in df.columns]
    df["date"] = pd.to_datetime(df["datetime"])
    return df

def compute_stats(coordinates):
    try:
        # Generate AOI
        aoi = create_aoi(coordinates)

        # Fetch items from the STAC API
        items = fetch_stac_items(collection_name)

        # Generate statistics for all items
        asset_name = "total"
        stats = []
        for item in items:
            stat = generate_stats(item, aoi, asset_name)
            if stat:
                stats.append(stat)

        # Clean and process stats
        df = clean_stats(stats)
        return df
    except Exception as e:
        print(f"Error in compute_stats: {str(e)}")
        return pd.DataFrame()

@api_view(['POST'])
def compute_stats_view(request):
    try:
        data = json.loads(request.body)
        coordinates = data.get("coordinates", [])
        print("Received coordinates:", coordinates)
        
        if not coordinates:
            return JsonResponse({"error": "No coordinates provided"}, status=400)

        df = compute_stats(coordinates)
        
        if df.empty:
            return JsonResponse({"error": "No data found for the given coordinates"}, status=404)
        
        response_data = df.to_dict(orient='records')
        return JsonResponse({"data": response_data}, status=200)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


#************************************************************************************************
# Function to generate spinning world 


from rest_framework.decorators import api_view
from django.http import JsonResponse
import json
import pandas as pd
import requests

STAC_API_URL = "https://earth.gov/ghgcenter/api/stac"
RASTER_API_URL = "https://earth.gov/ghgcenter/api/raster"
collection_name = "tm54dvar-ch4flux-monthgrid-v1"

def create_global_aoi():
    """Creates a GeoJSON object representing a global bounding box."""
    return {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [[[-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]]],
        },
    }

def fetch_stac_items_for_global_stats(start_year=1999, end_year=2024):
    """Fetches STAC items for all years, assuming global coverage."""
    all_items = []
    for year in range(start_year, end_year + 1):
        datetime_range = f"{year}-01-01T00:00:00Z/{year}-12-31T23:59:59Z"
        url = f"{STAC_API_URL}/collections/{collection_name}/items?limit=1&datetime={datetime_range}"
        response = requests.get(url)
        response.raise_for_status()
        items = response.json()["features"]
        all_items.extend(items)
    return all_items

def compute_global_stats():
    """Computes statistics for a global AOI across all available items."""
    try:
        global_aoi = create_global_aoi()
        items = fetch_stac_items_for_global_stats()
        stats = []
        for item in items:
            stat = requests.post(
                f"{RASTER_API_URL}/cog/statistics",
                params={"url": item["assets"]["total"]["href"]},
                json=global_aoi
            ).json()
            if stat:
                stats.append(stat)
        df = pd.json_normalize(stats)
        return df
    except Exception as e:
        print(f"Error in compute_global_stats: {str(e)}")
        return pd.DataFrame()

from rest_framework.decorators import api_view
from django.http import JsonResponse

@api_view(['POST'])  # This allows only POST requests
def compute_global_stats_view(request):
    try:
        # Assuming you might be passing parameters through POST, you handle them here
        # If no parameters are needed and you still want to use POST, just ignore the request data
        df = compute_global_stats()
        if df.empty:
            return JsonResponse({"error": "No global data found"}, status=404)
        response_data = df.to_dict(orient='records')
        return JsonResponse({"data": response_data}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# You'll need to add 'compute_global_stats_view' to your Django URLs configuration.













#working for MIKASA**************************************************************************








# Collection name and asset name for MiCASA Land Carbon Flux dataset
micasa_collection_name = "micasa-carbonflux-daygrid-v1"
micasa_asset_name = "rh"

# Function to get the CH₄ flux remains unchanged
# The logic will be similar but we will now modify it for MiCASA in a different function

# Function to fetch MiCASA dataset rescale values
def get_micasa_flux(item, color_map, rescale_values):
    response = requests.get(
        f"{RASTER_API_URL}/collections/{item['collection']}/items/{item['id']}/tilejson.json?"
        f"&assets={micasa_asset_name}"
        f"&color_formula=gamma+r+1.05&colormap_name={color_map}"
        f"&rescale={rescale_values['min']},{rescale_values['max']}"
    )
    return response.json()

# View for MiCASA Land Carbon Flux Data
@api_view(["GET"])
def carbon_data_view_micasa(request):
    print("MiCASA data request received")
    
    # Fetch the total number of items in the MiCASA collection
    items_response = requests.get(f"{STAC_API_URL}/collections/{micasa_collection_name}/items?limit=800")

    if not items_response.ok:
        return JsonResponse({"error": "Error fetching items from STAC API"}, status=500)

    items = items_response.json()["features"]

    # Map the items with their start date
    items_dict = {item["properties"]["datetime"][:10]: item for item in items}

    # Fetch rescale values from one of the items (e.g., 2023-01-01)
    rescale_values = {
        "max": items_dict["2023-01-01"]["assets"][micasa_asset_name]["raster:bands"][0]["histogram"]["max"],
        "min": items_dict["2023-01-01"]["assets"][micasa_asset_name]["raster:bands"][0]["histogram"]["min"]
    }

    # Colormap for visualization
    color_map = "purd"

    # Fetch MiCASA flux data for January 2023 (start and end of month)
    micasa_flux_1 = get_micasa_flux(items_dict['2023-01-01'], color_map, rescale_values)
    micasa_flux_2 = get_micasa_flux(items_dict['2023-01-31'], color_map, rescale_values)

    # Return the response to React with both datasets
    return JsonResponse({
        "micasa_flux_1": micasa_flux_1,
        "micasa_flux_2": micasa_flux_2,
        "rescale_values": rescale_values,
        "metadata": {
            "collection_name": micasa_collection_name,
            "total_items": len(items),
            "asset_name": micasa_asset_name,
            "color_map": color_map,
            "description": "MiCASA Land Carbon Flux Data for January 2023"
        }
    })
    
    
    
def create_micasa_aoi(coordinates):
    return {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [coordinates],
        },
    }

# Fetch the MiCASA dataset items (granules)
def fetch_micasa_stac_items(collection_name, start_year=2016, end_year=2024, limit=1):
    all_items = []
    
    for year in range(start_year, end_year + 1):
        datetime_range = f"{year}-01-01T00:00:00Z/{year}-12-31T23:59:59Z"
        response = requests.get(f"{STAC_API_URL}/collections/{collection_name}/items?limit={limit}&datetime={datetime_range}")
        response.raise_for_status()  # Check for errors
        items = response.json()["features"]
        all_items.extend(items)
    
    return all_items

# Generate statistics for a specific granule
def generate_micasa_stats(item, geojson, asset_name):
    try:
        result = requests.post(
            f"{RASTER_API_URL}/cog/statistics",
            params={"url": item["assets"][asset_name]["href"]},
            json=geojson,
        ).json()
        return {
            **result["properties"],
            "datetime": item["properties"]["start_datetime"],
        }
    except Exception as e:
        print(f"Error generating stats: {str(e)}")
        return None

# Clean and process the statistics JSON to a Pandas DataFrame
def clean_micasa_stats(stats_json):
    if not stats_json:
        return pd.DataFrame()  # Return empty DataFrame if no stats
    
    df = pd.DataFrame(stats_json)
    if 'statistics.b1.' in df.columns[0]:
        df.columns = [col.replace("statistics.b1.", "") for col in df.columns]
    df["date"] = pd.to_datetime(df["datetime"])
    return df

# Main function to compute the statistics
def compute_micasa_stats(coordinates):
    try:
        # Generate AOI
        aoi = create_aoi(coordinates)

        # Fetch items from the STAC API
        items = fetch_micasa_stac_items(micasa_collection_name)

        # Generate statistics for all items
        asset_name = "rh"
        stats = []
        for item in items:
            stat = generate_stats(item, aoi, asset_name)
            if stat:
                stats.append(stat)

        # Clean and process stats
        df = clean_stats(stats)
        return df
    except Exception as e:
        print(f"Error in compute_stats: {str(e)}")
        return pd.DataFrame()

# API view to handle the POST request for computing statistics
@api_view(['POST'])
def compute_micasa_stats_view(request):
    try:
        data = json.loads(request.body)
        coordinates = data.get("coordinates", [])
        print("Received coordinates:", coordinates)
        
        if not coordinates:
            return JsonResponse({"error": "No coordinates provided"}, status=400)

        df = compute_micasa_stats(coordinates)
        
        if df.empty:
            return JsonResponse({"error": "No data found for the given coordinates"}, status=404)
        
        response_data = df.to_dict(orient='records')
        return JsonResponse({"data": response_data}, status=200)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

