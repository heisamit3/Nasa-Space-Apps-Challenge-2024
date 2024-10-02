# carbon_data/services.py

import requests
import random

STAC_API_URL = 'https://earth.gov/ghgcenter/api/stac'
RASTER_API_URL = 'https://earth.gov/ghgcenter/api/raster'
COLLECTION_NAME = 'micasa-carbonflux-daygrid-v1'
ASSET_NAME = 'rh'


class CarbonDataService:
    def fetch_tile_data(self, items, date):
        """Fetch the tile data for the given date."""
        item = next((item for item in items if item['properties']['datetime'].startswith(date)), None)
        if not item:
            raise Exception(f"No item found for date: {date}")

        response = requests.get(
            f"{RASTER_API_URL}/collections/{item['collection']}/items/{item['id']}/tilejson.json",
            params={
                'assets': ASSET_NAME,
                'color_formula': 'gamma+r+1.05',
                'colormap_name': 'purd',
                'rescale': '0,0.3'
            }
        )
        response.raise_for_status()
        return response.json()

    def generate_stats(self, items):
        """Generate mock statistics for items."""
        return [
            {
                'datetime': item['properties']['datetime'],
                'max': 0.3 * random.random()  # Simulate a max value
            }
            for item in items
        ]

    def generate_carbon_data_points(self, items):
        """Generate mock carbon data points."""
        return [
            {
                'coordinates': item['geometry']['coordinates'],
                'value': 0.3 * random.random()  # Simulate a carbon data value
            }
            for item in items
        ]

    def get_carbon_data(self):
        """Main method to get carbon data."""
        try:
            response = requests.get(f"{STAC_API_URL}/collections/{COLLECTION_NAME}/items", params={'limit': 800})
            response.raise_for_status()
            items = response.json()['features']

            # Fetch tile data for two specific dates
            date1_tile = self.fetch_tile_data(items, '2023-01-01')
            date2_tile = self.fetch_tile_data(items, '2023-01-31')

            # Generate mock stats and carbon data points
            carbon_data_points = self.generate_carbon_data_points(items)

            return {
                'item_count': len(items),
                'stats': self.generate_stats(items),
                'date1_tile': date1_tile,
                'date2_tile': date2_tile,
                'bounds': [[32.81, -96.93], [33.28, -96.1]],  # Example bounding box
                'carbonDataPoints': carbon_data_points
            }
        except requests.RequestException as e:
            raise Exception(f"Failed to fetch carbon data: {str(e)}")
