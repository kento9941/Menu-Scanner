from backend.src.translator import Translator
import unittest

class TestTranslator(unittest.TestCase):
    def setUp(self):
        self.translator = Translator()

    def test_translate_EN_to_EN(self):
        en_text = "pizza"
        result = self.translator.translate_text(en_text)
        detected_language = result.get("detected_language")
        translated_text = result.get("translated_text")

        self.assertEqual("pizza", translated_text)
        self.assertEqual("en", detected_language)
        

    def test_translate_JP_to_EN(self):
        jp_text = "みそ汁"
        result = self.translator.translate_text(jp_text)
        detected_language = result.get("detected_language")
        translated_text = result.get("translated_text")

        self.assertEqual("ja", detected_language)
        self.assertIn("Miso", translated_text)
