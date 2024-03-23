import { state } from 'app/state/state';

import './fieldGenerator.scss';

export const fieldGenerator = async () => {
  const fieldContainer = document.querySelector('.field');

  const { initialString, currentLine } = state.getState() || [];

  let fieldItems = '';
  let wordsItems = '';

  initialString.forEach(() => {
    wordsItems += '<div class="word_field_container"></div>';
  });

  for (let i = 1; i <= 10; i += 1) {
    fieldItems += `
      <div class="field_item_wrap">
        <p class="number">${i}</p>
        <div class="field_items"></div>
      </div>
    `;
  }

  if (fieldContainer?.children.length === 0) {
    fieldContainer?.insertAdjacentHTML('beforeend', fieldItems);
  }

  const currentLineContainer = document.querySelectorAll('.field_items')[currentLine];
  currentLineContainer.insertAdjacentHTML('beforeend', wordsItems);
};
