export interface CurrentUser {
  firstName: string;
  surname: string;
}

export interface LevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface Word {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

export interface ImagePiece {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Round {
  levelData: LevelData;
  words: Word[];
}

export interface WordCollection {
  [key: number]: {
    rounds: Round[];
    roundsCount: number;
  };
}

export interface WordCollectionFromBackend {
  rounds: Round[];
  roundsCount: number;
}

export interface WordsWithIndexes {
  word: string;
  index: number;
}

export interface LevelsData {
  [key: string]: {
    rounds: Rounds;
  };
}

export interface Rounds {
  [key: string]: {
    strokes: StrokesData;
  };
}

export interface StrokesData {
  [key: string]: (StrokesDataItem | null)[];
}

export interface StrokesDataItem {
  label?: string;
  id?: string;
  piece?: ImagePiece;
}

export interface Hint {
  label: string;
  value: boolean;
}

export interface RoundsCount {
  level: number;
  count: number;
}

export type HintLabels = 'translation' | 'pronunciation' | 'background';

export interface FinishedLevel {
  level: number;
  round: number;
  count: number;
}

export interface FinishedLevels {
  [key: number]: number[];
}

export interface Statistic {
  correct: number[];
  incorrect: number[];
}

export interface StateProps {
  levels: LevelsData;
  data: WordCollection;
  currentData: Partial<Word>;
  initialString: (StrokesDataItem | null)[];
  currentLevelData: Partial<LevelData>;
  currentImage: string;
  currentLevel: number;
  currentRound: number;
  currentLine: number;
  roundsCount: RoundsCount[];
  hints: Hint[];
  finishedLevels: FinishedLevels;
  lastFinishedLevel: FinishedLevel;
  statistic: Statistic;
  pieces: ImagePiece[];
}
