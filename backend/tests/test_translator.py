from src.translator import Translator
import unittest

class TestTranslator(unittest.TestCase):
    def setUp(self):
        self.translator = Translator()

    def test_translate_EN_to_EN(self):
        en_text = "pizza"
        translated_text = self.translator.translate_text(en_text)

        self.assertEqual("pizza", translated_text)
        

    def test_translate_JP_to_EN(self):
        jp_text = "みそ汁"
        translated_text = self.translator.translate_text(jp_text)

        self.assertIn("Miso", translated_text)
