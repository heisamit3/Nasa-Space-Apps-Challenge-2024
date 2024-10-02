// Services/api.ts
import axios from 'axios';
import 'chartjs-adapter-date-fns';


const STAC_API_URL = "https://earth.gov/ghgcenter/api/stac";
const RASTER_API_URL = "https://earth.gov/ghgcenter/api/raster";

export interface GeoJson {
  type: string;
  properties: Record<string, unknown>;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface Item {
  id: string;
  type: string;
  properties: any;
  links: Array<{ href: string; rel: string; type?: string; title?: string }>;
  assets: Record<string, any>;
}

interface CollectionResponse {
  id: string;
  description: string;
  extent: {
    spatial: {
      bbox: number[][];
    };
    temporal: {
      interval: string[][];
    };
  };
  license: string;
  links: Array<{ href: string; rel: string; type: string }>;
  features: Item[];  // Adding this to handle items within the collection
}

interface TileResponse {
  tiles: string[];
  attribution: string;
}

interface StatisticsResponse {
  properties: {
    statistics: {
      b1: {
        count: number;
        min: number;
        max: number;
        mean: number;
      };
    };
  };
}

export const fetchCollection = async (collectionName: string): Promise<CollectionResponse | undefined> => {
  try {
    const response = await axios.get(`${STAC_API_URL}/collections/${collectionName}/items?limit=800`);
    console.log("Collection response: ", response.data);
    return response.data;  // Assuming the API returns the data directly
  } catch (error) {
    console.error("Error fetching collection:", error);
  }
};

export const fetchTile = async (
  collectionName: string,
  itemId: string,
  assetName: string,
  colormap: string,
  rescaleMin: number,
  rescaleMax: number
): Promise<TileResponse | undefined> => {
  try {
    const response = await axios.get<TileResponse>(
      `${RASTER_API_URL}/collections/${collectionName}/items/${itemId}/tilejson.json?&assets=${assetName}&color_formula=gamma+r+1.05&colormap_name=${colormap}&rescale=${rescaleMin},${rescaleMax}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tile:", error);
  }
};

export const fetchStatistics = async (itemUrl: string, geojson: GeoJson): Promise<StatisticsResponse | undefined> => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        url: itemUrl,
      }
    };
    const response = await axios.post<StatisticsResponse>(
      `${RASTER_API_URL}/cog/statistics`,
      geojson,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};
