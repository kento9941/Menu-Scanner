import requests

class Translator:
    def __init__(self):
        self.__url = "http://localhost:5000/translate"

    def translate_text(self, original_text, target_language="en") -> str:
        payload = {
            "q": original_text,
            "source": "auto",
            "target": target_language,
            "format": "text"
        }

        # POST
        try:
            response = requests.post(self.__url, json=payload, timeout=5)
            response.raise_for_status() # HTTP error
            return response.json()["translatedText"]
        except requests.exceptions.RequestException as e:
            raise Exception(f"Request failed: {e}")
        except ValueError:
            raise ValueError("Failed to parse JSON response")
