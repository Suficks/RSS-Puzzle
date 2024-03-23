import { state } from 'app/state/state';
import { audioPlay } from '../audioPlay';

export const showPronunciation = (isCorrect?: boolean) => {
  const isPronunciation = state.getHint('pronunciation');
  const pronunciationSwitcher = document.querySelector('.pronunciation_switcher');

  if (isPronunciation || isCorrect) {
    pronunciationSwitcher?.classList.add('visible');
  } else pronunciationSwitcher?.classList.remove('visible');
};

export const getAudio = () => {
  const pronunciationSwitcher = document.querySelector('.pronunciation_switcher');

  pronunciationSwitcher?.addEventListener('click', async () => {
    const { audioExample } = state.getState().currentData;
    await audioPlay(audioExample || '', pronunciationSwitcher);
  });
};
