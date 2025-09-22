import requests

class Translator:
    def __init__(self):
        self.__url = "http://localhost:5000/translate"

    def translate_text(self, original_text: str, source_language: str = "auto", target_language: str = "en") -> dict[str, str]:
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
            data = response.json()
            detected_language = data.get("detectedLanguage", {}).get("language")
            translated_text = data["translatedText"]
            return {"detected_language": detected_language, "translated_text": translated_text}
        except requests.exceptions.RequestException as e:
            raise Exception(f"Request failed: {e}")
        except ValueError:
            raise ValueError("Failed to parse JSON response")
