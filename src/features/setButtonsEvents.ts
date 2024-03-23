import { state } from 'app/state/state';
import { resultModalGenerator } from 'widgets/modalGenerator/resultModal/resultModalGenerator';
import { continueGame } from './continueGame';

export const setButtonsEvents = () => {
  const { word, textExample } = state.getState().currentData;
  const { currentLine } = state.getState();

  const strokesData = state.getStrokes()[word || ''];
  const textArray = textExample?.split(' ') || [];

  const checkBtn = document.querySelector('.check_btn');

  checkBtn?.addEventListener('click', () => {
    strokesData?.forEach((item, index) => {
      const currentWord = document.querySelectorAll(`.word_line_${currentLine}`)[index];

      if (item?.label !== textArray[index]) {
        currentWord?.classList.add('word_incorrect');
      } else currentWord?.classList.add('word_correct');
    });
  });

  const continueBtn = document.querySelector('.continue_btn');
  continueBtn?.addEventListener('click', continueGame);

  const resultsBtn = document.querySelector('.results_btn');
  resultsBtn?.addEventListener('click', resultModalGenerator);
};
