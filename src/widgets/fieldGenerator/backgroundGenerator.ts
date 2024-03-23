import { state } from 'app/state/state';
import { initGame } from 'features/initGame';
import { ImagePiece } from 'shared/types/types';

const ROWS_AMOUNT = 10;

export const backgroundGenerator = async () => {
  const canvas = document.getElementById('my-canvas') as HTMLCanvasElement;
  const { initialString, currentLine, currentImage } = state.getState() || [];
  const linePieces: ImagePiece[] = [];

  const ctx = canvas?.getContext('2d');
  const field = new Image();
  field.src = currentImage;

  field.onload = () => {
    const pieceWidth = canvas.width / initialString.length;
    const pieceHeight = canvas.height / ROWS_AMOUNT;

    for (let row = 0; row < ROWS_AMOUNT; row += 1) {
      for (let col = 0; col < initialString.length; col += 1) {
        const x = col * pieceWidth;
        const y = row * pieceHeight;

        ctx?.drawImage(field, x, y, pieceWidth, pieceHeight, x, y, pieceWidth, pieceHeight);

        if (row === currentLine) {
          linePieces.push({
            x,
            y,
            width: pieceWidth,
            height: pieceHeight,
          });
        }
      }
    }
    state.setPieces(linePieces);
    initGame();
  };
};
