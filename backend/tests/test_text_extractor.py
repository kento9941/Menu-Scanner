from backend.src.text_extractor import TextExtractor
import numpy as np
import unittest
from PIL import Image

class TestTextExtractor(unittest.TestCase):
    def setUp(self):
        self.text_extractor = TextExtractor(["ja", "en"])
        self.EN_test_image = "backend/tests/images/EN_sample_image.png"
        self.JP_test_image = "backend/tests/images/JP_sample_image.png"
        
    def test_extract_English_text(self):
        image_numpy_array = np.array(Image.open(self.EN_test_image))
        text = self.text_extractor.extract_text(image_numpy_array)
        
        self.assertIn("PHO", text)
        self.assertIn("GA", text)

    def test_extract_Japanese_text(self):
        image_numpy_array = np.array(Image.open(self.JP_test_image))
        text = self.text_extractor.extract_text(image_numpy_array)
        
        self.assertIn("ポトフ", text)
        self.assertIn("野菜", text)
        self.assertIn("ソーセージ", text)