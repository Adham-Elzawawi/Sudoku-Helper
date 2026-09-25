
# Sudoku Backend

## Run the FastAPI server

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Start the server

```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Open the API documentation

Open the following URL in your browser:

http://localhost:8000/docs

The backend is now running. You can test the `POST /scan` endpoint by uploading a Sudoku image.

To stop the server, press `Ctrl + C` in the terminal.