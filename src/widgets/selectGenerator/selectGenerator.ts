import { state } from 'app/state/state';
import { selectOptions } from 'features/selectOptions';
import { RoundsCount } from 'shared/types/types';

import './selectGenerator.scss';

export const selectListeners = () => {
  const selects = document.querySelectorAll('.select');

  selects.forEach((item) => {
    item.addEventListener('change', async (event) => {
      const attribute = item.getAttribute('data-select') || '';
      selectOptions(attribute, event);
    });
  });
};

export const selectGenerator = () => {
  const { currentRound, currentLevel, finishedLevels, roundsCount } = state.getState();
  const { count } = roundsCount.find((item) => item.level === currentLevel) as RoundsCount;
  const container = document.querySelector('.level_change');

  const levelOptions = Array.from({ length: 6 }, (_, i) => {
    const level = i + 1;
    const isFinished =
      finishedLevels[level]?.length &&
      roundsCount[level]?.count &&
      finishedLevels[level]?.length === roundsCount[level]?.count;

    return `<option class="option ${isFinished ? 'finished' : 'unfinished'}" ${level === currentLevel ? 'selected' : ''}>${level}</option>`;
  }).join('');

  const pageOptions = Array.from({ length: count }, (_, i) => {
    const isFinished = finishedLevels[currentLevel]?.includes(i);
    return `<option class="option ${isFinished ? 'finished' : 'unfinished'}" ${i + 1 === currentRound + 1 ? 'selected' : ''}>${i + 1}</option>`;
  }).join('');

  const template = `
    <div class="select_wrap">
        <label for="level">Level</label>
        <select id="level" data-select="level" class="select level">
          ${levelOptions}
        </select>
    </div>
    <div class="select_wrap">
        <label for="page">Page</label>
        <select id="page" data-select="page" class="select page">
          ${pageOptions}
        </select>
    </div>
  `;

  if (container) {
    container.innerHTML = '';
    container?.insertAdjacentHTML('beforeend', template);
  }
  selectListeners();
};
