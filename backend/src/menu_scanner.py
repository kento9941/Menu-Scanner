from src.text_extractor import TextExtractor
from src.translator import Translator
from src.pixabay_api import PixabayAPI
import numpy as np

class MenuScanner:
    LANGUAGES = {"en": ["en"],
                "ja": ["ja", "en"]}    

    def __init__(self, text_extractor: TextExtractor, translator: Translator, pixabay_api: PixabayAPI):
        self.__text_extractor = text_extractor
        self.__translator = translator
        self.__pixabay_api = pixabay_api

    def scan_menu(self, image_numpy_array: np.ndarray, source_language: str = "en", search_language: str = "en") -> set[str]:

        # extract text from menu image
        extracted_text = self.__text_extractor.extract_text(image_numpy_array, self.LANGUAGES[source_language])

        # translate to English
        translated_text = self.__translator.translate_text(extracted_text)

        # get dish image from Pixabay
        return self.__pixabay_api.get_image(translated_text, search_language)

