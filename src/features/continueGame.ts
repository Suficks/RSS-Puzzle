import { state } from 'app/state/state';
import { backgroundGenerator } from 'widgets/fieldGenerator/backgroundGenerator';
import { setNextLine } from './setNextLine';

export const buttonsChange = () => {
  const autoCompleteBtn = document.querySelector('.auto_complete_btn');
  const container = document.querySelector('.buttons_container');

  autoCompleteBtn?.classList.remove('invisible');
  container!.innerHTML = '';
};

export const continueGame = async () => {
  const field = document.querySelector('.field');
  const { currentLine } = state.getState();
  const words = document.querySelectorAll('.initial_word');

  const isLastLine = currentLine === 9;
  if (isLastLine && field) {
    field.innerHTML = '';
    state.removeStatistic();
  }
  words.forEach((item) => {
    item.classList.remove('initial_word');
  });

  await setNextLine();
  backgroundGenerator();
  buttonsChange();
};
