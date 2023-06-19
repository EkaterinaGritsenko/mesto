const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.getElementById('card-template');
const cardsContainer = document.querySelector('.cards');
const profileForm = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector() 
const profilePopup = document.querySelector('.popup-profile'); 
const cardForm = document.querySelector('.popup-card__form');// Воспользуйтесь методом querySelector() 
const cardPopup = document.querySelector('.popup-card'); 
const imagePopup = document.querySelector('.popup-image'); 
const openProfilePopupBtn = document.querySelector('.profile__edit-btn'); 
const closePopupProfileBtn = document.querySelector('.popup-profile__close-btn'); 
const profileFullname = document.querySelector('.profile__fullname'); 
const profileDescr = document.querySelector('.profile__descr'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_job');
const cardPopupBtn = document.querySelector('.profile__add-btn'); 
const closeCardPopupBtn = document.querySelector('.popup-card__close-btn'); 
const nameCardInput = document.querySelector('.popup-card__name'); 
const urlCardInput = document.querySelector('.popup-card__url');
const popupImage = document.querySelector('.popup-image__image'); 
const popupImageFigcaption = document.querySelector('.popup-image__figcaption'); 
const popupImageCloseBtn = document.querySelector('.popup-image__close-btn');

const createCard = (cardElement) => {
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardLikeButton = card.querySelector('.card__like');
  const cardDeleteButton = card.querySelector('.card__delete');

  cardTitle.textContent = cardElement.name;
  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;

   const handleDelete = () => {
    card.remove();
  }

  const handleLike = (evt) => {
    cardLikeButton.classList.toggle('card__like_active');
  }

  const handleImageClick = (evt) => {
    popupImage.src = cardImage.src;
    popupImage.alt =  cardImage.alt;
    popupImageFigcaption.textContent =  cardImage.alt;
    openPopupImage();
  }

  cardDeleteButton.addEventListener('click', handleDelete);
  cardLikeButton.addEventListener('click', handleLike);
  cardImage.addEventListener('click', handleImageClick )

  return card;
}

initialCards.forEach( function(card) {
  newCard = createCard(card);
  cardsContainer.append(newCard);
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
  openPopup(cardPopup);
}

function closePopupCard() {
  closePopup(cardPopup);
}

function openPopupImage() {
  openPopup(imagePopup);
}

function handleImageFormClose() {
  closePopup(imagePopup);
}

// Обработчик «отправки» формы, хотя пока 
// она никуда отправляться не будет 
function submitEditProfileForm (evt) { 
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
                                                // Так мы можем определить свою логику отправки. 
                                                // О том, как это делать, расскажем позже. 
  // Получите значение полей jobInput и nameInput из свойства value 
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
popupImageCloseBtn.addEventListener('click', handleImageFormClose); 
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

imagePopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup-image')) {
    handleImageFormClose(); 
  }
}); 