# FastAPI backend entry point for the Sudoku helper.
# It exposes one endpoint for scanning a photo and another for testing the image
# recognition flow against a bundled sample puzzle.
from fastapi import FastAPI, Request
from pathlib import Path
from PIL import Image

from imageProcess import convert_bytes_to_image
from scanner import scan_sudoku

app = FastAPI()


@app.post("/scan")
async def scan_image(request: Request):
    """Accepts a raw Sudoku image upload and returns the parsed board."""
    image_bytes = await request.body()

    image = convert_bytes_to_image(image_bytes)
    result = scan_sudoku(image)

    return result


@app.get("/test_image")
async def test_image():
    """Loads a sample image from the backend test assets and returns its parsed grid."""
    image_path = Path(__file__).parent / "test_images" / "sudoku_1.png"
    with Image.open(image_path) as img:
        image = img.convert("RGB")
        result = scan_sudoku(image)

    return result