import { changePage } from 'features/changePages';
import { getDataFromLocalStorage } from 'features/data/localStorage';
import { setStartPage } from '../startPage/startPage';
import './login.scss';
import { validation } from './validation';

export const addLoginForm = () => {
  const template = `
  <div class="form_wrapper">
    <div class="form_header">
      <h1 class="form_title">HELLO & WELCOME</h1>
      <h2 class="form_subtitle">To start the game you need to register. Please enter your first and last name. And our adventure will begin!</h2>
    </div>  
    <form class="form">
      <div class="input_wrap">
        <input placeholder="First name" class="input login_input firstName">
        <span class="error"></span>
      </div>
      <div class="input_wrap">
        <input placeholder="Surname" class="input login_input surname">
        <span class="error"></span>
      </div>
      <button class="button login_btn disabled">Login</button>
    </form>
  </div>
  `;

  if (getDataFromLocalStorage('currentUser')) {
    setStartPage();
  } else changePage(template);

  const inputs = document.querySelectorAll('.login_input');

  inputs.forEach((input) => [
    input.addEventListener('input', () => {
      validation(input as HTMLInputElement);
    }),
  ]);
};

addLoginForm();
