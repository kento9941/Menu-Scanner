from src.text_extractor import TextExtractor
from src.translator import Translator
from src.pixabay_api import PixabayAPI
import numpy as np

class MenuScanner:
    SUPPORTED_LANGUAGES = ["cs", "da", "de", "en", "es", "fr", "id", "it",
                            "hu", "nl", "no", "pl", "pt", "ro", "sk", "fi", "sv",
                            "tr", "vi", "th", "bg", "ru", "el", "ja", "ko", "zh"]

    def __init__(self, text_extractor: TextExtractor, translator: Translator, pixabay_api: PixabayAPI):
        self.__text_extractor = text_extractor
        self.__translator = translator
        self.__pixabay_api = pixabay_api

    def scan_menu(self, image_numpy_array: np.ndarray) -> set[str]:

        # extract text from menu image
        extracted_text = self.__text_extractor.extract_text(image_numpy_array)

        # detect language and translate to English
        translation_results = self.__translator.translate_text(extracted_text)
        detected_language = translation_results.get("detected_language")
        translated_text = translation_results.get("translated_text")

        # get dish image from Pixabay
        if detected_language in self.SUPPORTED_LANGUAGES:
            return self.__pixabay_api.get_image(extracted_text, detected_language)
        else:
            return self.__pixabay_api.get_image(translated_text, "en")
