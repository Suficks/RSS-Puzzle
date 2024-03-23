import { state } from 'app/state/state';
import { backgroundGenerator } from 'widgets/fieldGenerator/backgroundGenerator';
import { dataFetch, resourceFetch } from 'features/data/dataFetch';
import { buttonsChange } from './continueGame';

export const selectOptions = async (select: string, event: Event) => {
  const field = document.querySelector('.field');
  const lineNumber = document.querySelectorAll('.number');

  const selectedOption = Number((event.target as HTMLSelectElement).value);

  state.removeStatistic();

  if (select === 'level') {
    state.setCurrentLevel(selectedOption);
    await dataFetch();
  } else {
    state.setCurrentRound(selectedOption - 1);
    state.setCurrentData();
    state.setCurrentLevelData();
    await resourceFetch('image');
  }

  lineNumber.forEach((item) => {
    item.classList.remove('incorrect', 'correct');
  });
  field!.innerHTML = '';
  buttonsChange();

  backgroundGenerator();
};
