from fastapi import FastAPI, UploadFile, File
from backend.imageProcess import convert_bytes_to_image
from scanner import scan_sudoku

app = FastAPI()


@app.post("/scan")
async def scan_image(image: UploadFile = File(...)):
    image_bytes = await image.read()
    image = convert_bytes_to_image(image_bytes)

    result = scan_sudoku(image)

    return result