import { state } from 'app/state/state';
import { HintLabels } from 'shared/types/types';
import { showTranslation } from './showTranslation';
import { showPronunciation } from './pronunciation';
import { showBackground } from './showBackground';

export const setHints = (label: HintLabels) => {
  const value = state.getHint(label);
  state.setHints(label, !value);

  switch (label) {
    case 'translation':
      showTranslation();
      break;

    case 'pronunciation':
      showPronunciation();
      break;

    case 'background':
      showBackground();
      break;

    default:
  }
};
