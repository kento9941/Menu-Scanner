from src.menu_scanner import MenuScanner
from src.text_extractor import TextExtractor
from src.translator import Translator
from src.pixabay_api import PixabayAPI
import numpy as np
from PIL import Image

import unittest

class TestMenuScanner(unittest.TestCase):
    def setUp(self):        
        self.menu_scanner = MenuScanner(TextExtractor(["ja", "en"]), Translator(), PixabayAPI())
        self.EN_test_image = "tests/images/EN_sample_image.png"
        self.JP_test_image = "tests/images/JP_sample_image.png"

    def test_scan_menu_Japanese(self):
        image_numpy_array = np.array(Image.open(self.JP_test_image))
        result_images = self.menu_scanner.scan_menu(image_numpy_array)
        for image in result_images:
            print(image)
            
        self.assertIsInstance(result_images, set)
        self.assertTrue(len(result_images) > 0, "No images were retrieved")
        
