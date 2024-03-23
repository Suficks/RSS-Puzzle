import { state } from 'app/state/state';

export const showFinalImage = () => {
  const words = document.querySelectorAll('.word');
  const wordsContainer = document.querySelector('.words');
  const { author, name, year } = state.getState().currentLevelData;

  words.forEach((item) => {
    item.classList.add('invisible_word');
  });
  wordsContainer?.insertAdjacentHTML('beforeend', `<div class="info">${author} - ${name} (${year})</div>`);
};
