from src.menu_scanner import MenuScanner
from src.text_extractor import TextExtractor
from src.translator import Translator
from src.pixabay_api import PixabayAPI
import numpy as np
from PIL import Image

import unittest

class TestMenuScanner(unittest.TestCase):
    def setUp(self):        
        self.menu_scanner = MenuScanner(TextExtractor(), Translator(), PixabayAPI())
        self.EN_test_image = "tests/images/EN_sample_image.png"
        self.JP_test_image = "tests/images/JP_sample_image.png"

    def test_scan_menu_Japanese(self):
        image_numpy_array = np.array(Image.open(self.JP_test_image))
        results = self.menu_scanner.scan_menu(image_numpy_array, "ja", "en")
        extracted_text = results.get("extracted_text")
        translated_text = results.get("translated_text")
        image_urls = results.get("image_urls")
        for url in image_urls:
            print(url)
        
        self.assertIsInstance(extracted_text, str)
        self.assertIn("ポトフ", extracted_text)
        self.assertIsInstance(translated_text, str)
        self.assertIsInstance(image_urls, list)
        self.assertTrue(len(image_urls) > 0, "No images were retrieved")
        
