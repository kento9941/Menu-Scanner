import requests

class Translator:
    def __init__(self):
        self.__url = "http://localhost:5000/translate"

    def translate_text(self, original_text: str, source_language: str = "auto", target_language: str = "en") -> str:
        payload = {
            "q": original_text,
            "source": source_language,
            "target": target_language,
            "format": "text"
        }

        # POST
        try:
            response = requests.post(self.__url, json=payload, timeout=5)
            response.raise_for_status() # HTTP error
            response_data = response.json()
            translated_text = response_data.get("translatedText")
            if translated_text is None:
                raise ValueError("Response missing 'translatedText' key")
            return translated_text
        except requests.exceptions.RequestException as e:
            raise Exception(f"Request failed: {e}")
        except ValueError as e:
            raise ValueError(f"Failed to parse JSON response: {e}")
