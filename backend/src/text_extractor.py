import easyocr
import numpy as np

class TextExtractor:
    def __init__(self, languages):
        self.__reader = easyocr.Reader(languages)

    def extract_text(self, image_numpy_array: np.ndarray) -> str:
        results = self.__reader.readtext(image_numpy_array, paragraph=False)

        # convert into one string
        menu_texts = ""
        for _, text, confidence in results:
            if confidence > 0.6:
                menu_texts += text

        # for JP text (伸ばし棒)
        menu_texts = menu_texts.replace("-", "ー")
        return menu_texts
