export const changePage = (newPage: string) => {
  const { body } = document;

  body.classList.remove('body_change');
  body.style.overflow = 'hidden';
  body.innerHTML = '';
  body.insertAdjacentHTML('beforeend', newPage);

  setTimeout(() => {
    body.classList.add('body_change');
    body.style.overflow = '';
  }, 500);
};
