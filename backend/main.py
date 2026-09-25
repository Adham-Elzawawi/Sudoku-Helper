
from fastapi import FastAPI, Request
from imageProcess import convert_bytes_to_image
from scanner import scan_sudoku

app = FastAPI()


@app.post("/scan")
async def scan_image(request: Request):
    image_bytes = await request.body()

    image = convert_bytes_to_image(image_bytes)
    result = scan_sudoku(image)

    return result