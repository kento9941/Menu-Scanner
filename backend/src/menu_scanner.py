from src.text_extractor import TextExtractor
from src.translator import Translator
from src.pixabay_api import PixabayAPI
import numpy as np

class MenuScanner:
    LANGUAGES = {"chi_sim": ["chi_sim", "en"],
                "nl": ["nl", "en"],
                "en": ["en"],
                "fr": ["fr", "en"],
                "de": ["de", "en"],
                "id": ["id", "en"],
                "it": ["it", "en"],
                "ja": ["ja", "en"],
                "ko": ["ko", "en"],
                "pl": ["pl", "en"],
                "pt": ["pt", "en"],
                "ro": ["ro", "en"],
                "ru": ["ru", "en"],
                "es": ["es", "en"],
                "uk": ["uk", "en"],
                }

    def __init__(self, text_extractor: TextExtractor, translator: Translator, pixabay_api: PixabayAPI):
        self.__text_extractor = text_extractor
        self.__translator = translator
        self.__pixabay_api = pixabay_api

    def scan_menu(self, image_numpy_array: np.ndarray, source_language: str = "en", search_language: str = "en") -> dict:

        # extract text from menu image
        extracted_text = self.__text_extractor.extract_text(image_numpy_array, self.LANGUAGES[source_language])

        # translate to English
        translated_text = self.__translator.translate_text(extracted_text)

        # get dish image from Pixabay (search in English is recommended)
        image_urls = self.__pixabay_api.get_image(translated_text, search_language)

        return {"extracted_text": extracted_text, "translated_text": translated_text, "image_urls": image_urls}