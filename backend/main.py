from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
import base64
import numpy as np
import cv2
from utils.preprocessing import preprocess_image

app = FastAPI()

origins = [
    "http://localhost:3001",         
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True, 
    allow_methods=["*"],    
    allow_headers=["*"],    
)

@app.post("/api/upload")
async def predict_image(image:dict):
    image_base64 = image.get("image")
    if not image_base64:
        raise HTTPException(status_code=400, detail="No image data found")
    header, image_base64 = image_base64.split(",", 1)
    image_bytes = base64.b64decode(image_base64)
    np_array = np.frombuffer(image_bytes, dtype=np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    processed_image = preprocess_image(img)    

    return {"message": "Hello, CORS-enabled world!"}
