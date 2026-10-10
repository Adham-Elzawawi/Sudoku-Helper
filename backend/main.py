from fastapi import FastAPI, Request
from pathlib import Path
from PIL import Image

from imageProcess import convert_bytes_to_image
from scanner import scan_sudoku

app = FastAPI()


@app.post("/scan")
async def scan_image(request: Request):
    image_bytes = await request.body()

    image = convert_bytes_to_image(image_bytes)
    result = scan_sudoku(image)

    return result


@app.get("/test_image")
async def test_image():
    image_path = Path(__file__).parent / "test_images" / "sudoku_1.png"
    with Image.open(image_path) as img:
            image = img.convert("RGB")

            result = scan_sudoku(image)
    return result