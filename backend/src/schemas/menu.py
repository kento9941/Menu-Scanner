from pydantic import BaseModel
from typing import List

class MenuScanResponse(BaseModel):
    extracted_text: str
    translated_text: str
    image_urls: List[str]