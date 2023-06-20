
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass:'popup__button_disabled', // 'popup__save-btn_invalid',
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

const setEventListeners = (formToValidate,{inputSelector,submitButtonSelector, inputErrorClass, ...rest }) => { 
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector));
  const formButton = formToValidate.querySelector(submitButtonSelector);
  
  disableButton(formButton, rest);

  formInputs.forEach(input => { 
    input.addEventListener('input', () =>{
      checkInputValidity(input, inputErrorClass);
      if(hasInvalidInput(formInputs)) {
         disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest); 
      }
    })
  })
}

const checkInputValidity = (input, inputErrorClass) => {
  const currentInputErrorContainer = document.querySelector(`#${input.id}-error`) ;
  if (input.checkValidity()) {
    input.classList.remove(inputErrorClass);
    currentInputErrorContainer.textContent = '';
  } else {
    input.classList.add(inputErrorClass);
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
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
}

//export default enableValidation;
enableValidation(validationConfig);