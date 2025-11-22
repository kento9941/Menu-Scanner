from fastapi import FastAPI, UploadFile, Form, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import numpy as np
from PIL import Image
from src.schemas.menu import MenuScanResponse
from src.menu_scanner import MenuScanner
from src.text_extractor import TextExtractor
from src.translator import Translator
from src.pixabay_api import PixabayAPI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://menu-scanner-eight.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

menu_scanner = MenuScanner(TextExtractor(), Translator(), PixabayAPI())

@app.post("/upload-image", response_model = MenuScanResponse)
async def upload_image(source_language: str = Form(...), image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    image_bytes = await image.read()
    # catch invalid image format
    try:
        image_numpy_array = np.array(Image.open(BytesIO(image_bytes)))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")
    
    return menu_scanner.scan_menu(image_numpy_array, source_language, "en")
