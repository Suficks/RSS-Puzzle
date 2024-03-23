import { CurrentUser } from 'shared/types/types';
import { setDataToLocalStorage } from 'features/data/localStorage';
import { setStartPage } from '../startPage/startPage';

export const validation = (input: HTMLInputElement) => {
  const firstNameInput = document.querySelector('.firstName') as HTMLInputElement;
  const surnameInput = document.querySelector('.surname') as HTMLInputElement;
  const errors = document.querySelectorAll('.error');
  const loginBtn = document.querySelector('.login_btn');
  const regexp: RegExp = /^[a-zA-Z\\-]+$/;
  const error = input.nextElementSibling as HTMLElement;

  const { value } = input;

  const errorMessages = {
    emptyField: 'Please fill the field',
    invalidCharacters: 'Enter only English letters or hyphens',
    capitalLetters: 'Please enter name in capital letters',
    shortFirstName: 'First name must be at least 3 letters',
    shortSurname: 'Surname must must be at least 4 letters',
  };

  const tests = [
    { condition: !value, message: errorMessages.emptyField },
    { condition: !regexp.test(value), message: errorMessages.invalidCharacters },
    { condition: value[0] !== value[0]?.toUpperCase(), message: errorMessages.capitalLetters },
    { condition: input === firstNameInput && value.length < 3, message: errorMessages.shortFirstName },
    { condition: input === surnameInput && value.length < 4, message: errorMessages.shortSurname },
  ];

  const currentError = tests.find((item) => item.condition);

  if (error) {
    error.classList.toggle('error_active', !!currentError);
    error.innerHTML = currentError ? currentError.message : '';
  }

  const isInvalid =
    !firstNameInput.value ||
    !surnameInput.value ||
    Array.from(errors).some((item: Element) => item.classList.contains('error_active'));

  loginBtn?.addEventListener('click', (e: Event) => {
    e.preventDefault();

    const currentUser: CurrentUser = {
      firstName: firstNameInput.value,
      surname: surnameInput.value,
    };
    if (!isInvalid) {
      setDataToLocalStorage<CurrentUser>('currentUser', currentUser);
      setStartPage();
    }
  });

  loginBtn?.classList.toggle('disabled', isInvalid);
  input.classList.toggle('invalid', !!currentError);
};
