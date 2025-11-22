from ast import List
import requests
import os
from dotenv import load_dotenv
from src.interfaces.image_accessor_interface import ImageAccessorInterface

load_dotenv()

class PixabayAPI(ImageAccessorInterface):
    def __init__(self):
        self.__api_key = os.getenv("PIXABAY_API_KEY")

    def get_image(self, query: str, language: str = "en", max_images=6) -> list[str]:
        url = 'https://pixabay.com/api/'
        params = {
            'key': self.__api_key,
            'q': query,
            'lang': language,
            'image_type': 'photo',
            'category': 'food',
            'per_page': max_images,
            'safesearch': 'true'
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()  # raise an exception for bad responses
            data = response.json()
            # print(f"Pixabay query: {query}, response: {data}")
        except requests.RequestException as e:
            print(f"Error fetching images: {e}")
            return []
        except ValueError:
            print(f"Error decoding JSON response.")
            return []

        # check for API errors
        if "hits" not in data:
            print(f"Unexpected API response: {data}")
            return []

        # get image urls
        image_urls = set(
            hit.get('webformatURL')
            for hit in data.get('hits', [])
            if hit.get('webformatURL')
        )
        return list(image_urls)
