import easyocr
import numpy as np

class TextExtractor:
    def __init__(self, languages):
        self.__reader = easyocr.Reader(languages)

    def extract_text(self, image_numpy_array: np.ndarray) -> set[str]:
        results = self.__reader.readtext(image_numpy_array, paragraph=False)
        texts = set()
        for _, text, confidence in results:
            if confidence > 0.8:
                texts.add(text)
        return texts
