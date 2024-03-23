import { getDataFromLocalStorage } from 'features/data/localStorage';

import './welcomeModalGenerator.scss';

export const welcomeModalGenerator = () => {
  const { level, round } = getDataFromLocalStorage('lastFinishedLevel') || {};

  const template = `
    <div class="welcome_modal">
      <h1 class="modal_title">Добро пожаловать обратно!</h1>
      <p class="modal_title">В последний раз вы завершили <span class="bold">уровень ${level}, раунд ${round + 1}</span></p>
    </div>
  `;
  if (level) {
    document.body.insertAdjacentHTML('beforeend', template);
  }

  const modal = document.querySelector('.welcome_modal');

  setTimeout(() => {
    modal?.classList.add('modal_active');
  }, 100);

  setTimeout(() => {
    modal?.classList.remove('modal_active');
    modal?.addEventListener('transitionend', () => modal?.remove());
  }, 3000);
};
