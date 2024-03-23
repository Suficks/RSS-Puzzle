import { state } from 'app/state/state';
import { audioPlay } from 'features/audioPlay';
import { Word } from 'shared/types/types';

const createResultSentenceElement = (item: Word) => `<div class="result_sentence_wrap">
       <button class="listen" data-path="${item.audioExample}"></button>
       <p class="result_sentence">${item.textExample}</p>
     </div>`;

export const resultGenerator = async () => {
  const { statistic, currentLevel, currentRound, data, currentLevelData, currentImage } = state.getState();
  const { words } = data[currentLevel].rounds[currentRound];
  const { author, name, year } = currentLevelData;

  const incorrectContainer = document.querySelector('.incorrect_wrap');
  const correctContainer = document.querySelector('.correct_wrap');
  const miniature = document.querySelector('.mini_pic') as HTMLImageElement;
  const aboutPicContainer = document.querySelector('.about_pic');

  const correctWords = statistic.correct.map((index) => words[index]);
  const inCorrectWords = statistic.incorrect.map((index) => words[index]);

  correctWords.forEach((item) => {
    correctContainer?.insertAdjacentHTML('beforeend', createResultSentenceElement(item));
  });

  inCorrectWords.forEach((item) => {
    incorrectContainer?.insertAdjacentHTML('beforeend', createResultSentenceElement(item));
  });

  const listenBtn = document.querySelectorAll('.listen');
  listenBtn?.forEach((item) =>
    item.addEventListener('click', async () => {
      const path = item.getAttribute('data-path') || '';
      audioPlay(path, item);
    })
  );

  if (miniature && aboutPicContainer) {
    aboutPicContainer.innerHTML = `${author} - ${name} (${year})`;
    miniature.src = currentImage;
  }
};
