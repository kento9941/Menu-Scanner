from backend.src.translator import Translator
import unittest

class TestTranslator(unittest.TestCase):
    def setUp(self):
        self.translator = Translator()

    def test_translate_EN_to_EN(self):
        en_text = "spaghetti bolognese"
        result = self.translator.translate_text(en_text, "en")
        detected_language = result["detected_language"]
        translated_text = result["translated_text"]
        self.assertEqual("en", detected_language)
        self.assertEqual("spaghetti bolognese", translated_text)

    def test_translate_JP_to_EN(self):
        jp_text = "みそ汁"
        result = self.translator.translate_text(jp_text, "ja")
        detected_language = result["detected_language"]
        translated_text = result["translated_text"]
        self.assertEqual("ja", detected_language)
        self.assertIn("Miso", translated_text)
