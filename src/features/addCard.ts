import { state } from 'app/state/state';

export const addCard = (item: Element, dataAttribute: string) => {
  const { initialString } = state.getState();
  const text = item?.textContent || '';
  const id = item.getAttribute('data-id') || '';
  const piece = initialString.find((elem) => elem?.id === id)?.piece;

  state.addStrokesItemByName(dataAttribute || '', {
    label: text,
    id,
    piece,
  });

  state.removeElemFromInitialString(id);
};
