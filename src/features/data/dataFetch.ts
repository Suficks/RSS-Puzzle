import { state } from 'app/state/state';

export const resourceFetch = async (resourceType: 'audio' | 'image', resourceName?: string) => {
  try {
    const { imageSrc } = state.getState().currentLevelData;

    let url;

    if (resourceType === 'audio') {
      url = `https://raw.githubusercontent.com/Suficks/rss-puzzle-data/main/${resourceName}`;
    } else if (resourceType === 'image') {
      url = `https://raw.githubusercontent.com/Suficks/rss-puzzle-data/main/images/${imageSrc}`;
    }

    const res = await fetch(url || '');
    const data = await res.blob();
    const resourceUrl = URL.createObjectURL(data);

    if (resourceType === 'audio') {
      return new Audio(resourceUrl);
    }
    if (resourceType === 'image') {
      state.setCurrentImage(resourceUrl);
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const dataFetch = async () => {
  try {
    const { currentLevel } = state.getState();

    if (!state.getState().data[currentLevel]) {
      const url = `https://raw.githubusercontent.com/Suficks/rss-puzzle-data/main/data/wordCollectionLevel${currentLevel}.json`;
      const res = await fetch(url);
      const data = await res.json();
      state.setData(data);
    }
    state.setDataByLevels();
    state.setCurrentData();
    state.setCurrentLevelData();
  } catch (err) {
    console.log(err);
  }
};
