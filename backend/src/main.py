from fastapi import FastAPI, UploadFile, Form, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import numpy as np
from PIL import Image
import os
from dotenv import load_dotenv
from src.schemas.menu import MenuScanResponse
from src.menu_scanner import MenuScanner
from src.text_extractor import TextExtractor
from src.translator import Translator
from src.pixabay_api import PixabayAPI

load_dotenv()

app = FastAPI()

# Get allowed origins from environment variable, fallback to defaults
frontend_url = os.getenv("FRONTEND_URL", "https://menu-scanner-eight.vercel.app")
allowed_origins = [
    "http://localhost:3000",
    frontend_url
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

print("DEBUG FRONTEND_URL:", os.getenv("FRONTEND_URL"))
print("DEBUG ALLOWED_ORIGINS:", allowed_origins)

menu_scanner = MenuScanner(TextExtractor(), Translator(), PixabayAPI())

@app.get("/")
async def root():
    return {
        "message": "Menu Scanner API is running",
        "cors_enabled": True,
        "allowed_origins": allowed_origins
    }

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

@app.post("/test")
async def test():
    return {"message": "POST test successful", "cors_works": True}
