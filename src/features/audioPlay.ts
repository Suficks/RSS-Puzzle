import { resourceFetch } from 'features/data/dataFetch';

export const audioPlay = async (audioPath: string, audioItem: Element) => {
  const audio = (await resourceFetch('audio', audioPath || '')) as HTMLAudioElement;

  if (audio) {
    audio.play();

    audio.onplay = () => {
      audioItem.classList.add('audio_play');
    };

    audio.onpause = () => {
      audioItem.classList.remove('audio_play');
    };
  }
};
