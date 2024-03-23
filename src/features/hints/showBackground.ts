import { state } from 'app/state/state';

export const showBackground = (isCorrect?: boolean) => {
  const words = document.querySelectorAll('.word');
  const isBackground = state.getHint('background');
  const { currentLine } = state.getState();

  words.forEach((elem) => {
    const isWordInCorrectLine =
      !elem.classList.contains(`word_line_${currentLine}`) && !elem.classList.contains('initial_word');

    if (isBackground || isCorrect || isWordInCorrectLine) {
      elem.classList.remove('word_background');
    } else {
      elem.classList.add('word_background');
    }
  });
};
