import easyocr
import numpy as np

class TextExtractor:

    def extract_text(self, image_numpy_array: np.ndarray, source_language: list[str]) -> str:
        self.__reader = easyocr.Reader(source_language)
        results = self.__reader.readtext(image_numpy_array, paragraph=False)

        # convert into one string
        menu_texts = ""
        for _, text, confidence in results:
            if confidence > 0.6:
                menu_texts += text

        # for JP text (伸ばし棒)
        menu_texts = menu_texts.replace("-", "ー")
        return menu_texts
