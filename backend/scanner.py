from imageProcess import convert_bytes_to_image
from pytesseract import image_to_string
import cv2
import numpy as np


def scan_sudoku(image_bytes: bytes) -> list[list[int]]:
    try:
        image = convert_bytes_to_image(image_bytes)
        cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        text = image_to_string(cv_image)
        lines = text.strip().split('\n')
        print(f"Recognized text: {lines}")  
    except ValueError as e:
        raise ValueError(f"Failed to scan Sudoku: {e}")
        