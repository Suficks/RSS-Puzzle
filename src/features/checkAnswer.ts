import { state } from 'app/state/state';
import { showPronunciation } from './hints/pronunciation';
import { setButtonsEvents } from './setButtonsEvents';
import { showTranslation } from './hints/showTranslation';
import { showBackground } from './hints/showBackground';
import { showFinalImage } from './showFinalImage';

export const checkAnswer = (autoComplete?: boolean) => {
  const { currentLine, initialString } = state.getState();
  const { word, textExample } = state.getState().currentData;

  const container = document.querySelector('.buttons_container');
  const wordContainer = document.querySelectorAll('.field_item_wrap')[currentLine];
  const lineNumber = document.querySelectorAll('.number')[currentLine];
  const autoCompleteBtn = document.querySelector('.auto_complete_btn');

  const textArray = textExample?.split(' ') || [];
  const strokesData = state.getStrokes()[word || ''];

  const isInitialStringEmpty = initialString.every((elem) => elem === null);
  const isCorrect = strokesData.every((item, index) => item?.label === textArray[index]);
  const isLastLine = currentLine === 9;

  if (!container) return;

  if (isInitialStringEmpty) {
    if (isCorrect) {
      wordContainer.classList.add('locked');
      lineNumber.classList.remove('incorrect');
      lineNumber.classList.add('correct');
      container.innerHTML = '';
      container?.insertAdjacentHTML('beforeend', `<button class="button continue_btn">Continue</button>`);
      autoCompleteBtn?.classList.add('invisible');
      state.setStatistic(currentLine, !autoComplete);
      showTranslation(isCorrect);
      showPronunciation(isCorrect);
      showBackground(isCorrect);
      if (isLastLine) {
        container?.insertAdjacentHTML('afterbegin', `<button class="button results_btn">Results</button>`);
        state.setFinishedLevels();
        state.setCurrentLevelData();
        showFinalImage();
      }
    } else {
      lineNumber.classList.add('incorrect');
      container.innerHTML = '';
      container?.insertAdjacentHTML('beforeend', `<button class="button check_btn">Check</button>`);
    }
  } else lineNumber.classList.remove('incorrect');

  setButtonsEvents();
};
