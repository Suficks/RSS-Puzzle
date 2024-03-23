import { state } from 'app/state/state';
import { renderLine } from 'features/renderLine';

import './wordsGenerator.scss';

export const wordsGenerator = () => {
  const wordsContainer = document.querySelector('.words');
  const { initialString } = state.getState() || [];

  let wordsContainers = '';

  initialString.forEach(() => {
    wordsContainers += `
      <div class="word_container"></div>
    `;
  });

  if (wordsContainer) {
    wordsContainer.innerHTML = '';
    wordsContainer?.insertAdjacentHTML('beforeend', wordsContainers);
    const allContainers = wordsContainer?.querySelectorAll('.word_container') as NodeListOf<Element>;

    renderLine(allContainers, initialString, 'add');
  }
};
