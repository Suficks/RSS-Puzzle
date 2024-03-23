import { shuffle } from 'features/arrayShuffle';
import { getDataFromLocalStorage, setDataToLocalStorage } from 'features/data/localStorage';
import {
  FinishedLevel,
  Hint,
  ImagePiece,
  RoundsCount,
  StateProps,
  StrokesDataItem,
  WordCollectionFromBackend,
} from 'shared/types/types';
import { v4 as uuidv4 } from 'uuid';

const TOTAL_LEVELS = 6;

const initialHints = [
  { label: 'translation', value: true },
  { label: 'pronunciation', value: true },
  { label: 'background', value: true },
];

const initialStatistic = { correct: [], incorrect: [] };

class State {
  state: StateProps;

  constructor() {
    const lastFinishedLevelData = getDataFromLocalStorage('lastFinishedLevel');
    const currentRound = this.initialCurrentRound(lastFinishedLevelData);
    const currentLevel = this.initialCurrentLevel(lastFinishedLevelData);

    this.state = {
      data: {},
      levels: {},
      currentData: {},
      initialString: [],
      currentLevelData: {},
      currentImage: '',
      currentRound,
      currentLevel,
      currentLine: 0,
      roundsCount: getDataFromLocalStorage('roundsCount') || [],
      hints: getDataFromLocalStorage('hints') || initialHints,
      finishedLevels: getDataFromLocalStorage('finishedLevels') || {},
      lastFinishedLevel: { level: 1, round: 0, count: 1 },
      statistic: initialStatistic,
      pieces: [],
    };
  }

  initialCurrentRound(lastFinishedLevelData: FinishedLevel) {
    if (lastFinishedLevelData) {
      const { round, count } = lastFinishedLevelData;
      return round + 1 >= count ? 0 : round + 1;
    }
    return 0;
  }

  initialCurrentLevel(lastFinishedLevelData: FinishedLevel) {
    if (lastFinishedLevelData) {
      const { level, round, count } = lastFinishedLevelData;
      if (level !== TOTAL_LEVELS) {
        return round + 1 >= count ? level + 1 : level;
      }
      return 1;
    }
    return 1;
  }

  getState() {
    return this.state;
  }

  getRounds() {
    const { currentLevel } = this.state;
    return this.state.levels[currentLevel].rounds;
  }

  getStrokes() {
    const { currentLevel, currentRound } = this.state;
    return this.state.levels[currentLevel].rounds[currentRound].strokes;
  }

  getHint(label: string) {
    return this.state.hints.find((item) => item.label === label)?.value;
  }

  addElemToInitialString(elem: StrokesDataItem) {
    for (let i = 0; i < this.state.initialString.length; i += 1) {
      if (this.state.initialString[i] === null) {
        this.state.initialString[i] = elem;
        break;
      }
    }
  }

  removeElemFromInitialString(id: string) {
    const index = this.state.initialString.findIndex((item) => item?.id === id);
    this.state.initialString[index] = null;
  }

  setPieces(piece: ImagePiece[]) {
    this.state.pieces = piece;
    this.state.initialString = shuffle(
      this.state.initialString.map((item, index) => {
        return {
          ...item,
          piece: piece[index],
        };
      })
    );
  }

  setHints(label: string, value: boolean) {
    const existingHintIndex = this.state.hints.findIndex((hint) => hint.label === label);

    if (existingHintIndex !== -1) {
      this.state.hints[existingHintIndex].value = value;
    } else {
      this.state.hints.push({ label, value });
    }
    setDataToLocalStorage<Hint[]>('hints', this.state.hints);
  }

  setCurrentLevel(level: number) {
    this.state.currentLevel = level;
    this.setCurrentLine(0);
    this.setCurrentRound(0);
  }

  setCurrentRound(round: number) {
    this.state.currentRound = round;
    this.setCurrentLine(0);
  }

  setCurrentLine(line: number) {
    this.state.currentLine = line;
  }

  setData(data: WordCollectionFromBackend) {
    const { currentLevel } = this.state;

    this.state.data[currentLevel] = data;
    this.state.roundsCount.push({
      level: currentLevel,
      count: data.roundsCount,
    });
    setDataToLocalStorage<RoundsCount[]>('roundsCount', this.state.roundsCount);
  }

  setCurrentData() {
    const { data, currentRound, currentLine, currentLevel, pieces } = this.state;
    const { rounds } = data[currentLevel];
    const round = rounds[currentRound];

    if (round) {
      this.state.currentData = round.words[currentLine];
      this.state.initialString = round.words[currentLine].textExample.split(' ').map((label, index) => ({
        label,
        id: uuidv4().slice(0, 8),
        piece: pieces?.[index],
      }));
    }
  }

  setCurrentLevelData() {
    const { data, currentRound, currentLevel } = this.state;
    const { rounds } = data[currentLevel];
    const round = rounds[currentRound].levelData;
    if (round) {
      this.state.currentLevelData = round;
    }
  }

  setCurrentImage(image: string) {
    this.state.currentImage = image;
  }

  addStrokesItemByName(name: string, elem: StrokesDataItem) {
    const strokesByName = this.getStrokes()[name];
    const index = strokesByName.findIndex((item) => item === null);

    if (index >= 0) {
      strokesByName[index] = elem;
    } else strokesByName.push(elem);
  }

  removeStrokesItemByName(name: string, id: string) {
    const index = this.getStrokes()[name].findIndex((item) => item?.id === id);
    this.getStrokes()[name][index] = null;
  }

  setDataByLevels() {
    const { currentLevel } = this.state;
    const { rounds } = this.state.data[currentLevel];
    this.state.levels[currentLevel] = { rounds: {} };

    rounds?.forEach((item, index) => {
      this.state.levels[currentLevel].rounds[index] = { strokes: {} };

      item.words.forEach((elem) => {
        this.state.levels[currentLevel].rounds[index].strokes[elem.word || ''] = [];
      });
    });
  }

  setStatistic(line: number, correct: boolean) {
    if (correct) {
      this.state.statistic.correct.push(line);
    } else this.state.statistic.incorrect.push(line);
  }

  removeStatistic() {
    this.state.statistic = { correct: [], incorrect: [] };
  }

  setFinishedLevels() {
    const { currentLevel, currentRound, roundsCount } = this.state;
    if (!this.state.finishedLevels[currentLevel]) {
      this.state.finishedLevels[currentLevel] = [];
    }
    if (!this.state.finishedLevels[currentLevel].includes(currentRound)) {
      this.state.finishedLevels[currentLevel].push(currentRound);
    }
    this.state.lastFinishedLevel = {
      level: currentLevel,
      round: currentRound,
      count: roundsCount.find((item) => item.level === currentLevel)?.count || 0,
    };
    setDataToLocalStorage('finishedLevels', this.state.finishedLevels);
    setDataToLocalStorage('lastFinishedLevel', this.state.lastFinishedLevel);
  }
}

export const state = new State();
