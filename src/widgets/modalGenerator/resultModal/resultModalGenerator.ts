import { continueGame } from 'features/continueGame';
import { state } from 'app/state/state';
import { resultGenerator } from './resultGenerator';

import './resultModalGenerator.scss';

export const addModal = () => {
  const modal = document.querySelector('.result_modal');
  const overlay = document.querySelector('.overlay');

  setTimeout(() => {
    overlay?.classList.add('overlay_active');
    modal?.classList.add('result_active');
  }, 100);
};

export const removeModal = () => {
  const modal = document.querySelector('.result_modal');
  const overlay = document.querySelector('.overlay');

  modal?.classList.remove('result_active');
  overlay?.classList.remove('overlay_active');

  modal?.addEventListener('transitionend', () => {
    modal?.remove();
    overlay?.remove();
  });
};

export const resultModalGenerator = () => {
  const { statistic } = state.getState();

  const template = `
    <div class="overlay"></div>
    <div class="result_modal">
      <div class="modal_header">
        <img class="mini_pic" alt="picture"/>
        <p class="about_pic"></p>
      </div>
      <div class="scrollable">
        <div class="section">
          <div class="title_wrap">
            <h3 class="section_title">I don't know</h3>
            <div class="section_count incorrect_count">${statistic.incorrect.length}</div>
          </div>
          <div class="sentences_wrap incorrect_wrap"></div>
        </div>
        <div class="section">
          <div class="title_wrap">
            <h3 class="section_title">I know</h3>
            <div class="section_count correct_count">${statistic.correct.length}</div>
          </div>
          <div class="sentences_wrap correct_wrap"></div>
        </div>
      </div>
      <button class="button continue_btn result_btn">Continue</button>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', template);

  const overlay = document.querySelector('.overlay');
  overlay?.addEventListener('click', removeModal);

  const continueBtn = document.querySelector('.result_btn');
  continueBtn?.addEventListener('click', () => {
    removeModal();
    continueGame();
  });

  resultGenerator();
  addModal();
};
