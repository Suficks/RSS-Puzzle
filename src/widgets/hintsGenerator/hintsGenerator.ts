import { setHints } from 'features/hints/setHints';
import { HintLabels } from 'shared/types/types';
import { state } from 'app/state/state';

import './hints.scss';

export const hintGenerator = () => {
  const container = document.querySelector('.menu');
  const isTranslation = state.getHint('translation');
  const isPronunciation = state.getHint('pronunciation');
  const isBackground = state.getHint('background');

  const template = `
    <button data-button="translation" class="button menu_btn translate ${isTranslation ? '' : 'off'}"></button>
    <button data-button="pronunciation" class="button menu_btn pronunciation ${isPronunciation ? '' : 'off'}"></button>
    <button data-button="background" class="button menu_btn background ${isBackground ? '' : 'off'}"></button>
  `;

  if (container) {
    container.innerHTML = '';
    container?.insertAdjacentHTML('beforeend', template);
  }

  const buttons = document.querySelectorAll('.menu_btn');

  buttons.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('off');
      const label = item.getAttribute('data-button') as HintLabels;
      setHints(label);
    });
  });
};
