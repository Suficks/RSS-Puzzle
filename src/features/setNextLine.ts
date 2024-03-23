import { state } from 'app/state/state';
import { dataFetch, resourceFetch } from 'features/data/dataFetch';
import { RoundsCount } from 'shared/types/types';

export const setNextLine = async () => {
  const field = document.querySelector('.field');

  const { currentLine, currentRound, currentLevel, roundsCount } = state.getState();
  const { count } = roundsCount.find((item) => item.level === currentLevel) as RoundsCount;

  const isLastLine = currentLine === 9;
  const isLastRound = currentRound === count - 1;
  const isLastLevel = currentLevel === 6;

  if (!field) return;

  if (isLastLevel && isLastRound && isLastLine) {
    state.setCurrentLevel(1);
  } else if (isLastRound && isLastLine) {
    state.setCurrentLevel(currentLevel + 1);
    await dataFetch();
  } else if (isLastLine) {
    state.setCurrentRound(currentRound + 1);
    state.setCurrentData();
    state.setCurrentLevelData();
    await resourceFetch('image');
  } else {
    state.setCurrentLine(currentLine + 1);
  }

  state.setCurrentData();
};
