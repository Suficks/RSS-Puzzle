import { state } from 'app/state/state';

export const showTranslation = (isCorrect?: boolean) => {
  const container = document.querySelector('.sentence');
  const { textExampleTranslate } = state.getState().currentData;
  const isTranslation = state.getHint('translation');

  if (isTranslation || isCorrect) {
    container?.classList.add('visible');
  } else container?.classList.remove('visible');

  if (container) {
    setTimeout(() => {
      container.innerHTML = textExampleTranslate || '';
    }, 300);
  }
};
