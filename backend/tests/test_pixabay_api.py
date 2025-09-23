from src.pixabay_api import PixabayAPI
import unittest

class TestPixabayAPI(unittest.TestCase):
    def setUp(self):
        self.pixabay_api = PixabayAPI()

    def test_get_images_in_English(self):
        en_text = "pizza with tomato"
        image_urls = self.pixabay_api.get_image(en_text, "en")

        self.assertIsInstance(image_urls, list)
        self.assertTrue(len(image_urls) > 0, "No images were retrieved for English query")
        for url in image_urls:
            self.assertIsInstance(url, str)

    def test_get_images_in_Japanese(self):
        jp_text = "味噌汁"
        image_urls = list(self.pixabay_api.get_image(jp_text, "ja"))

        self.assertIsInstance(image_urls, list)
        self.assertTrue(len(image_urls) > 0, "No images were retrieved for Japanese query")
        for url in image_urls:
            self.assertIsInstance(url, str)
