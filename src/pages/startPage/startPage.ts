import { getDataFromLocalStorage } from 'features/data/localStorage';
import { CurrentUser } from 'shared/types/types';
import { dataFetch } from 'features/data/dataFetch';
import { changePage } from 'features/changePages';
import { addLoginForm } from 'pages/loginPage/loginForm';
import { setMainPage } from 'pages/mainPage/mainPage';

import './startPage.scss';

export const setStartPage = () => {
  const { firstName, surname }: CurrentUser = getDataFromLocalStorage('currentUser');

  const template = `
    <div class="start_page">
      <h1 class="title">ENGLISH PUZZLE</h1>
      <h2 class="greeting">Hello,${firstName} ${surname}!</h2>
      <h2 class="subtitle">Click on the words in the desired order to collect the original phrase. Words can be drag and drop. Select levels and tooltips in the menu.</h2>
      <h2 class="subtitle learn">Learn and have fun!</h2>
      <button class="button start_btn">Start</button>
      <button class="button log_out_btn">Log out</button>
    </div>
  `;
  changePage(template);

  const startBtn = document.querySelector('.start_btn');
  startBtn?.addEventListener('click', async () => {
    await dataFetch();
    setMainPage();
  });

  const logOutBtn = document.querySelector('.log_out_btn');
  logOutBtn?.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('hints');
    addLoginForm();
  });
};
