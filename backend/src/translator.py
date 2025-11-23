import requests
import os

class Translator:
    def __init__(self):
        self.__url = "https://libretranslate.com/translate"
        self.__api_key = os.getenv("LIBRETRANSLATE_API_KEY")

    def translate_text(self, original_text: str, source_language: str = "auto", target_language: str = "en") -> str:
        payload = {
            "q": original_text,
            "source": source_language,
            "target": target_language,
            "format": "text",
            "api_key": self.__api_key
        }

        # POST
        try:
            response = requests.post(self.__url, json=payload, timeout=5)
            response.raise_for_status() # HTTP error
            return response.json().get("translatedText")
        except requests.exceptions.RequestException as e:
            raise Exception(f"Request failed: {e}")
        except ValueError:
            raise ValueError("Failed to parse JSON response")
