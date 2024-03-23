import { state } from 'app/state/state';
import { checkAnswer } from './checkAnswer';
import { renderLine } from './renderLine';

export const autoComplete = () => {
  const { currentLine, initialString, pieces } = state.getState();
  const { textExample, word } = state.getState().currentData;

  const fieldContainer = document.querySelectorAll('.field_items')[currentLine];
  const wordsContainer = fieldContainer.querySelectorAll('.word_field_container');
  const initialContainer = document.querySelectorAll('.word_container');

  const textArray = textExample?.split(' ') || [];

  state.getStrokes()[word || ''] = [];

  textArray.forEach((item, index) => {
    initialString.fill(null);
    state.addStrokesItemByName(word || '', { label: item, id: String(index), piece: pieces[index] });
    renderLine(initialContainer, initialString, 'remove');
    renderLine(wordsContainer, state.getStrokes()[word || ''], 'add');
  });

  checkAnswer(true);
};
