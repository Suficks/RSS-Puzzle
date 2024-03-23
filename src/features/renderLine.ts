import { state } from 'app/state/state';
import { StrokesDataItem } from 'shared/types/types';
import { addCard } from './addCard';
import { changeFontSize } from './changeFontSize';
import { checkAnswer } from './checkAnswer';
import { removeCard } from './removeCard';

export const renderLine = (
  wordsContainers: NodeListOf<Element>,
  words: (StrokesDataItem | null)[],
  mode: 'add' | 'remove'
) => {
  const { word } = state.getState().currentData;
  const { currentLine, currentImage, hints } = state.getState();
  const containersArray = [...wordsContainers];

  const isAddMode = mode === 'add';
  const className = isAddMode ? 'initial_word' : `word_line_${currentLine}`;
  const isBackground = hints.find((item) => item.label === 'background')?.value;

  words.forEach((item, index) => {
    containersArray[index].innerHTML = '';

    if (item !== null) {
      containersArray[index].insertAdjacentHTML(
        'beforeend',
        `<div class="puzzle-piece" style="background-image: url('${currentImage}'); background-position: -${item.piece?.x}px -${item.piece?.y}px;"></div>
          <div data-word="${word}" data-id="${item.id}" class="${className} word ${isBackground ? '' : 'word_background'}">${item.label}</div>
        `
      );
    }
  });

  const wordsNodes = document.querySelectorAll(`.${className}`);

  wordsNodes.forEach((item) => {
    changeFontSize(item as HTMLElement);

    item.addEventListener('click', () => {
      if (isAddMode) {
        addCard(item, word || '');
      } else {
        removeCard(item, word || '');
      }
      const { initialString } = state.getState();
      const initialContainer = document.querySelectorAll('.word_container');
      const fieldContainer = document.querySelectorAll('.field_items')[currentLine];
      const wordsContainer = fieldContainer.querySelectorAll('.word_field_container');

      renderLine(initialContainer, initialString, 'add');
      renderLine(wordsContainer, state.getStrokes()[word || ''], 'remove');

      checkAnswer();
    });
  });
};
