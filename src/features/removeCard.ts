import { state } from 'app/state/state';

export const removeCard = (item: Element, dataAttribute: string) => {
  const text = item?.textContent || '';
  const id = item.getAttribute('data-id') || '';
  const piece = state.getStrokes()[dataAttribute].find((elem) => elem?.id === id)?.piece;

  state.removeStrokesItemByName(dataAttribute, id);

  state.addElemToInitialString({ label: text, id, piece });
};
