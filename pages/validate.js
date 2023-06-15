// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const enableValidation =({formSelector, ...rest}) => {
  const forms =  Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form =>{
    form.addEventListener('submit',  (evt) =>{
    evt.preventDefault();
  })
  setEventListeners(form, rest); 
  }) 
}

const setEventListeners = (formToValidate,{inputSelector,submitButtonSelector, ...rest }) => { 
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector));
  const formButton = formToValidate.querySelector(submitButtonSelector);
  disableButton(formButton, rest);
  formInputs.forEach(input => { 
    input.addEventListener('input', () =>{
      checkInputValidity(input);
      if(hasInvalidInput(formInputs)) {
         disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
    })
  })
}

const checkInputValidity = (input) => {
  const currentInputErrorContainer = document.querySelector(`#${input.id}-error`) ;
  if (input.checkValidity()) {
    currentInputErrorContainer.textContent = '';
  } else {
    currentInputErrorContainer.textContent = input.validationMessage
  }
}

const hasInvalidInput = (formInputs) => {
  return formInputs.some(item => !item.validity.valid);
}

const enableButton = (button, {inactiveButtonClass}) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
}

const disableButton = (button, {inactiveButtonClass}) => {
  button.classList.add(inactiveButtonClass);//('popup__save-btn_invalid');
  button.setAttribute('disabled', true);
}

enableValidation(validationConfig);