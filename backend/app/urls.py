from django.urls import path
from .views import *
urlpatterns = [
    path('api/message/', message_view, name='message_view'),
    path('api/login/', login_view, name='login_view'),
    path('api/signup/', signup_view, name='signup_view'),
#    path('api/carbon-flux/', get_carbon_flux_data, name='carbon_flux_data'),
#     path('api/', api_endpoints, name='api_endpoints'),
     path('carbon_data/', carbon_data_view, name='carbon-data'),
        path('carbon_data_CH4/', carbon_data_view_CH4, name='carbon-data-CH4'),
    path('carbon_data_stats_CH4/', carbon_data_stats_CH4, name='carbon_data_stats_CH4'),
    path('compute_stats_view/', compute_stats_view, name='compute_stats_view'),
    path('compute_global_stats_view/', compute_global_stats_view, name='compute_global_stats_view'),
    path('carbon_data_view_micasa/', carbon_data_view_micasa, name='carbon_data_view_micasa'),
    # compute_micasa_stats_view
    path('compute_micasa_stats_view/', compute_micasa_stats_view, name='compute_micasa_stats_view'),
    path('api/userprofile/', userprofile_view, name='userprofile'),  # Endpoint for fetching user profile
    path('api/getstories/', getstories_view, name='getstories'),
    path('api/setstory/', setstory_view, name='setstory'),
    path('api/set_alert/', set_alert, name='set_alert'),
    path('api/get_alerts/', get_alerts, name='get_alerts'),
    path('airsea_data_CO2/',airSea_data_view_CO2,name='airSea_data_view_CO2'),
    path('compute_air_sea_co2_stats_view/',compute_micasa_stats_view,name='compute_air_sea_co2_stats_view')
]
