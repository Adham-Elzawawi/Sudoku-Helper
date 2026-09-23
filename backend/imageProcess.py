
import io
from PIL import Image

def convert_bytes_to_image(image_bytes: bytes) -> Image.Image:
    try:
        image = Image.open(io.BytesIO(image_bytes))
        return image.convert("RGB")

    except Exception as e:
        raise ValueError(f"Error converting bytes to image: {e}")