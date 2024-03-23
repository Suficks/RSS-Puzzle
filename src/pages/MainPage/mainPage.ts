import { changePage } from 'features/changePages';
import { autoComplete } from 'features/autoComplete';
import { getAudio } from 'features/hints/pronunciation';
import { welcomeModalGenerator } from 'widgets/modalGenerator/welcomeModal/welcomeModalGenerator';
import { backgroundGenerator } from 'widgets/fieldGenerator/backgroundGenerator';
import { resourceFetch } from 'features/data/dataFetch';

import './mainPage.scss';

export const setMainPage = async () => {
  const template = `
      <main class="main_page">
        <div class="header">
          <div class="level_change"></div>
          <div class="menu"></div>
        </div>
        <div class="translation">
          <button class="pronunciation_switcher"></button>
          <div class="sentence"></div>
        </div>
        <div class="game">
          <canvas width="700" height="500" id="my-canvas"></canvas>
          <div class="field"></div>
          <div class="words"></div>
          <button button class="button auto_complete_btn">I don't know :(</button>
          <div class="buttons_container">
          </div>
        </div>
      </main>
    `;

  changePage(template);
  await resourceFetch('image');
  getAudio();
  backgroundGenerator();
  welcomeModalGenerator();

  const autoCompleteBtn = document.querySelector('.auto_complete_btn');
  autoCompleteBtn?.addEventListener('click', () => {
    autoCompleteBtn.classList.add('invisible');
    autoComplete();
  });
};
