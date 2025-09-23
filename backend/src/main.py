from fastapi import FastAPI, UploadFile, Form, File, HTTPException
import numpy as np
from PIL import Image
from src.menu_scanner import MenuScanner
from src.text_extractor import TextExtractor
from src.translator import Translator
from src.pixabay_api import PixabayAPI

app = FastAPI()

menu_scanner = MenuScanner(TextExtractor(), Translator(), PixabayAPI())

@app.post("/upload-image")
async def upload_image(source_language: str = Form(...), image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    image_numpy_array = np.array(Image.open(image.file))
    return menu_scanner.scan_menu(image_numpy_array, source_language, "en")
