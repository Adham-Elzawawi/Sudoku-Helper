# Sudoku OCR and grid extraction logic.
# The pipeline converts the image to grayscale, thresholds it, splits it into a
# 9x9 grid, and reads each cell using OCR to detect digits.
from PIL import Image
from imageProcess import convert_bytes_to_image
from pytesseract import image_to_string
import cv2
import numpy as np


def scan_sudoku(image: Image.Image) -> list[list[int]]:
    """Preprocesses a Sudoku photo and turns it into a 9x9 matrix of values."""
    cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
    thresh = cv2.threshold(cv_image, 100, 255, cv2.THRESH_BINARY)[1]
    thresh = cv2.resize(thresh, (0, 0), fx=1.25, fy=1.25)

    grid = divide_into_grid(thresh)
    return grid


def divide_into_grid(image: np.ndarray) -> list[list[int]]:
    """Splits a processed Sudoku board into 9x9 cells and OCR-detects each digit."""
    rows = np.array_split(image, 9, axis=0)
    grid = []

    for row in rows:
        cells = np.array_split(row, 9, axis=1)
        numbers = []

        for cell in cells:
            h, w = cell.shape
            cell = cell[h // 10 : -h // 10, w // 10 : -w // 10]

            number = image_to_string(
                cell,
                config="--psm 10 "
                "-c tessedit_char_whitelist=123456789",
            ).strip()

            if number.isdigit():
                numbers.append(int(number) if number in "123456789" else -1)
            else:
                numbers.append(-1)

        grid.append(numbers)

    return grid