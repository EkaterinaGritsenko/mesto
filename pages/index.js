import FormValidator from "../components/formValidator.js";
import Card from '../components/card.js';
import  {validationConfig,initialCards }  from '../utils/constants.js';

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
const popupImageCloseBtn = document.querySelector('.popup-image__close-btn');
const imagePopup = document.querySelector('.popup-image'); 

const formPopup = new FormValidator(profilePopup, validationConfig); //создание экземпляра валидируемого класса для профайла
//console.log(formPopup);
const formCard = new FormValidator(cardForm, validationConfig);//создание экземпляра валидируемого класса для карточки
//console.log(formCard);
formPopup.enableValidation();
formCard.enableValidation();


function handleImageClick(a, b)  {
  const popupImage = document.querySelector('.popup-image__image'); 
  const popupImageFigcaption = document.querySelector('.popup-image__figcaption'); 
  popupImage.src = b;
  popupImage.alt =  a;
  popupImageFigcaption.textContent = a;
  openPopupImage();
}
 
initialCards.forEach((item) =>  {
  const newCard = new Card('.card-template', item.name, item.link, handleImageClick);
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
  formCard._disableButton();
  openPopup(cardPopup);
}

function closePopupCard() {
  closePopup(cardPopup);
}


function openPopupImage() {
  openPopup(imagePopup);
  document.addEventListener('keydown', keyEscHandler);
}

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
  const newCard = new Card('.card-template', elementName, elementUrl, handleImageClick);
  const elementCard = newCard.generateCard();

  cardsContainer.prepend(elementCard);
  closePopupCard(); 
}

function keyEscHandler (evt) {
  if (evt.key === "Escape" || evt.key === "Esc") {
    const formForClose =  document.querySelector('.popup_opened'); 
    closePopup(formForClose);
}
}

function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup')) { 
    closePopup(evt.currentTarget)
  } 
}

openProfilePopupBtn.addEventListener('click', openPopupProfile ); 
closePopupProfileBtn.addEventListener('click', closePopupProfile ); 
 
cardPopupBtn.addEventListener('click', openPopupCard) ; 
closeCardPopupBtn.addEventListener('click', closePopupCard); 

popupImageCloseBtn.addEventListener('click',  handleImageFormClose); 
 
profileForm.addEventListener('submit', submitEditProfileForm); 
cardForm.addEventListener('submit', submitAddCardForm); 
profilePopup.addEventListener('click', closePopupByOverlay);
cardPopup.addEventListener('click', closePopupByOverlay);
imagePopup.addEventListener('click', closePopupByOverlay);