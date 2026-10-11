
# Utility helpers for preparing uploaded Sudoku images before analysis.
import io
from PIL import Image


def convert_bytes_to_image(image_bytes: bytes) -> Image.Image:
    """Converts raw image bytes into a PIL image in RGB format.

    This ensures the scanner receives a consistent color space for preprocessing
    and digit detection.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        return image.convert("RGB")
    except Exception as e:
        raise ValueError(f"Error converting bytes to image: {e}")