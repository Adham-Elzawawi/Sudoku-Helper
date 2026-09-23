def scan_sudoku(image_bytes: bytes) -> list[list[int]]:
    try:
        return [[0]]
    except Exception as e:
        raise ValueError(f"Error scanning Sudoku: {e}")