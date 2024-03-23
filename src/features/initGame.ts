import { fieldGenerator } from 'widgets/fieldGenerator/fieldGenerator';
import { wordsGenerator } from 'widgets/wordsGenerator/wordsGenerator';
import { hintGenerator } from 'widgets/hintsGenerator/hintsGenerator';
import { selectGenerator } from 'widgets/selectGenerator/selectGenerator';
import { showTranslation } from './hints/showTranslation';
import { showPronunciation } from './hints/pronunciation';
import { showBackground } from './hints/showBackground';

export const initGame = () => {
  wordsGenerator();
  fieldGenerator();
  selectGenerator();
  hintGenerator();
  showTranslation();
  showPronunciation();
  showBackground();
};
