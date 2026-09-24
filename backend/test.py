
from pathlib import Path
from PIL import Image
import unittest
import ast

from scanner import scan_sudoku


class TestScanSudoku(unittest.TestCase):

    def test_scan_sudoku(self):
        folder = Path(__file__).parent

        for n in [1, 2]:
            with self.subTest(sudoku=n):
                image = Image.open(
                    folder / f"test_images/sudoku_{n}.png"
                )

                with open(folder / f"test_expected/sudoku_{n}.txt") as f:
                    expected = ast.literal_eval(f.read())

                result = scan_sudoku(image)

                self.assertEqual(len(result), 9)
                self.assertTrue(all(len(row) == 9 for row in result))
                
                correct = 0
                for i in range(9):
                    for j in range(9):
                        if result[i][j] == expected[i][j]:
                            correct += 1
                        else:
                            print(f"Mismatch at cell ({i}, {j}): "
                                  f"expected {expected[i][j]}, got {result[i][j]}")

                accuracy = correct / 81

                print(f"\nSudoku {n}:")
                print(f"Accuracy: {accuracy:.2%}")
                print(f"Correct cells: {correct}/81")

                self.assertGreaterEqual(accuracy, 0.95) # Ensure at least 95% accuracy


if __name__ == "__main__":
    unittest.main()