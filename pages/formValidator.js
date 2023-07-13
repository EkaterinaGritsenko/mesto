class formValidator {
  constructor(
    form,
    {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}
    ) {   
      this._form = form;
      this._inputSelector = inputSelector;
      this._submitButtonSelector = submitButtonSelector;
      this._inactiveButtonClass = inactiveButtonClass;
      this._inputErrorClass = inputErrorClass;
      this._errorClass = errorClass;   
    }  

  enableValidation () {
    this._formInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._formButton = this._form.querySelector(this._submitButtonSelector);
    this._setEventListeners();
  }

  _setEventListeners() { 
    this._disableButton();
    this._formInputs.forEach(input => { 
    input.addEventListener('input', (evt) =>{
    // console.log(input.value);
    this._checkInputValidity(input);
    if(this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton(); 
      }
    })
  })
}
    
  _disableButton() {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.setAttribute('disabled', true);
    }

  _hasInvalidInput () {
    return this._formInputs.some(item => !item.validity.valid);
    }
      
  _enableButton () {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.removeAttribute('disabled');
  }

  _checkInputValidity(input){
    const currentInputErrorContainer = document.querySelector(`#${input.id}-error`) ;
      if (input.checkValidity()) {
        input.classList.remove(this._inputErrorClass);
        currentInputErrorContainer.textContent = '';
      } else {
        input.classList.add(this._inputErrorClass);
        currentInputErrorContainer.textContent = input.validationMessage
      }
    }
} 
    
export default formValidator;
