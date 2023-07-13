import formValidator from "./formValidator.js";
import Card from './card.js';
import initialCards from './constants.js';
const validationConfig = {
 //formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled', 
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
 

const profileForm = document.querySelector('.popup__form');// форма !! 
const profilePopup = document.querySelector('.popup-profile'); 
const openProfilePopupBtn = document.querySelector('.profile__edit-btn'); 
const closePopupProfileBtn = document.querySelector('.popup-profile__close-btn'); 
const profileFullname = document.querySelector('.profile__fullname'); 
const profileDescr = document.querySelector('.profile__descr'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_job');
const cardPopupBtn = document.querySelector('.profile__add-btn'); 

const cardTemplate = document.getElementById('card-template');
const cardsContainer = document.querySelector('.cards');
const cardForm = document.querySelector('.popup-card__form'); // форма !! 
const cardPopup = document.querySelector('.popup-card'); 
const closeCardPopupBtn = document.querySelector('.popup-card__close-btn'); 
const nameCardInput = document.querySelector('.popup-card__name'); 
const urlCardInput = document.querySelector('.popup-card__url');

const formPopup = new formValidator(profilePopup, validationConfig); //создание экземпляра валидируемого класса для профайла
const formCard = new formValidator(cardForm, validationConfig);//создание экземпляра валидируемого класса для карточки
formPopup.enableValidation();
formCard.enableValidation();

 
initialCards.forEach((item) =>  {
  const newCard = new Card(item.name, item.link);
  const cardElement = newCard.generateCard();
  document.querySelector('.cards').append(cardElement);
 }
);

function openPopup(popupForm) { 
  popupForm.classList.add('popup_opened'); 
  document.addEventListener('keydown', keyEscHandler);
}

function closePopup(popupForm) { 
  document.removeEventListener('keydown', keyEscHandler);
  popupForm.classList.remove('popup_opened'); 
}

function openPopupProfile() { 
  nameInput.value = profileFullname.textContent; 
  jobInput.value = profileDescr.textContent; 
  openPopup(profilePopup); 
} 

function closePopupProfile() { 
  closePopup(profilePopup);
} 

function openPopupCard() {
  cardForm.reset();
  const  button = cardForm.querySelector(validationConfig.submitButtonSelector);
  button.classList.add(validationConfig.inactiveButtonClass);
  button.setAttribute('disabled', true);
  openPopup(cardPopup);
}

function closePopupCard() {
  closePopup(cardPopup);
}
/*
function openPopupImage() {
  openPopup(imagePopup);
}*/

function handleImageFormClose() {
  closePopup(imagePopup);
}

// Обработчик «отправки» формы, хотя пока 
// она никуда отправляться не будет 
function submitEditProfileForm (evt) { 
  evt.preventDefault(); 
  const nameInputValue = nameInput.value; 
  const jobInputValue = jobInput.value; 

  // Вставьте новые значения с помощью textContent 
  profileFullname.textContent = nameInput.value; 
  profileDescr.textContent = jobInput.value; 
  closePopupProfile(); 
} 

function submitAddCardForm (evt) { 
  evt.preventDefault();
  const elementName =nameCardInput.value; 
  const elementUrl =urlCardInput.value; 
  const elementCard = createCard ({
      name:  elementName,
      link: elementUrl
    });
    
    cardsContainer.prepend(elementCard, cardsContainer.firstElementChild);
    closePopupCard(); 
}

function keyEscHandler (evt) {
  if (evt.key === "Escape" || evt.key === "Esc") {
    const formForClose =  document.querySelector('.popup_opened'); 
    closePopup(formForClose);
}
}

openProfilePopupBtn.addEventListener('click', openPopupProfile ); 
closePopupProfileBtn.addEventListener('click', closePopupProfile ); 
cardPopupBtn.addEventListener('click', openPopupCard) ; 
closeCardPopupBtn.addEventListener('click', closePopupCard); 
profileForm.addEventListener('submit', submitEditProfileForm); 
cardForm.addEventListener('submit', submitAddCardForm); 


profilePopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup-profile')) {
    closePopupProfile(); 
  }
}); 

cardPopup.addEventListener('click', function (evt) {;
  if (evt.target.classList.contains('popup-card')) {
    closePopupCard(); 
  }
}); 