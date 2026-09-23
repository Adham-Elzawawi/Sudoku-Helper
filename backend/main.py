from fastapi import FastAPI, UploadFile, File
from scanner import scan_sudoku

app = FastAPI()


@app.post("/scan")
async def scan_image(image: UploadFile = File(...)):
    image_bytes = await image.read()

    result = scan_sudoku(image_bytes)

    return result