// включение валидации вызовом enableValidation
// все настройки передаются при вызове
/*
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  */
console.log(profileForm);

 const enableValidation = () => {
  profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();  
   })
   setEventListeners(profileForm);
 }


const setEventListeners = (formToValidate) => {
  const formInputs = Array.from(formToValidate.querySelectorAll('.popup__input'));
  const popupButton = formToValidate.querySelector('.popup__save-btn');
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
    checkInputValidity(input);
      if (hasInvalidInput(formInputs)) {
        disableButton(popupButton);
      } else {
        enableButton(popupButton);
      }
    })
  });
}

const checkInputValidity = (input) => {
  const currentInputErrorContainer = document.querySelector(`#${input.id}-error`);
  if (input.checkValidity()) {
    currentInputErrorContainer.textContent = '';
  } else {
    currentInputErrorContainer.textContent = input.validationMessage;
  }
}

const enableButton = (button) => {
  button.classList.remove('popup__save-btn_invalid');
  button.classList.add('popup__save-btn_valid');
  button.removeAttribute('disabled');
}

const disableButton = (button) => {
  button.classList.add('popup__save-btn_invalid');
  button.classList.remove('popup__save-btn_valid');
  button.setAttribute('disabled', true);
}
  
const hasInvalidInput = (formInputs) => {
  return formInputs.some(item => !item.validity.valid); 
}

enableValidation();