from django.urls import path
from .views import message_view, login_view, signup_view,carbon_data_view,carbon_data_view_CH4,carbon_data_stats_CH4,compute_stats_view

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
]
