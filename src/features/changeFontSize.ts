export const changeFontSize = (item: HTMLElement) => {
  const copy = item;
  const width = copy.offsetWidth;

  if (width > 70) {
    copy.style.fontSize = `14px`;
  }
};
