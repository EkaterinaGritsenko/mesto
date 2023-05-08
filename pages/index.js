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

const elementTemplate = document.getElementById('element-template');
const elementContainer = document.querySelector('.elements');

const createElement = (cardElement) =>{
  const element = elementTemplate.content.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const elementLikeButton = element.querySelector('.element__like');
  const elementDeleteButton = element.querySelector('.element__delete');
  elementTitle.textContent = cardElement.name;
  elementImage.src = cardElement.link;
  elementImage.alt = cardElement.name;

  const handleDelete = () => {
    element.remove();
  }

  const handleLike = (evt) => {
    elementLikeButton.classList.toggle('element__like_active');
  }

  const handleImageClick = (evt) => {
    popupPreview_image.src = elementImage.src;
    popupPreview_figcaption.textContent =  elementImage.alt;
    openPopupPreview();
  }

  elementDeleteButton.addEventListener('click', handleDelete);
  elementLikeButton.addEventListener('click', handleLike);
  elementImage.addEventListener('click', handleImageClick )

  return element;
}

initialCards.forEach( function(card) {
  element = createElement(card);
  elementContainer.appendChild(element);
 }
);

let profileForm = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector() 
let profilePopup = document.querySelector('.popup-profile'); 
let elementForm = document.querySelector('.popup-element__form');// Воспользуйтесь методом querySelector() 
let elementPopup = document.querySelector('.popup-element'); 
let previewPopup = document.querySelector('.popup-preview'); 
let openPopupBnt = document.querySelector('.profile__edit-btn'); 
let closePopupBtn = document.querySelector('.popup__close-btn'); 
let profileFullname = document.querySelector('.profile__fullname'); 
let profileDescr = document.querySelector('.profile__descr'); 
let nameInput = document.querySelector('.popup__input_type_name'); 
let jobInput = document.querySelector('.popup__input_type_job');
let elementPopupBtn = document.querySelector('.profile__add-btn'); 
let closeElementPopupBtn = document.querySelector('.popup-element__close-btn'); 
let nameElementInput = document.querySelector('.popup-element-name'); 
let urlElementInput = document.querySelector('.popup-element-url');
let popupPreview_image = document.querySelector('.popup-preview__image'); 
let popupPreview_figcaption = document.querySelector('.popup-preview__figcaption'); 
let popupPreview_close_btn = document.querySelector('.popup-preview__close-btn');

function PopupOpen(popupForm) { 
  popupForm.classList.add('popup_opened'); 
}

function PopupClose(popupForm) { 
  popupForm.classList.remove('popup_opened'); 
}

function openPopupProfile() { 
  nameInput.value = profileFullname.textContent; 
  jobInput.value = profileDescr.textContent; 
  PopupOpen(profilePopup); 
} 

function closePopupProfile() { 
  PopupClose(profilePopup);
} 

function openPopupElement() {
  nameElementInput.value = '';
  urlElementInput.value = '';
  PopupOpen(elementPopup);
}

function closePopupElement() {
  PopupClose(elementPopup);
}

function openPopupPreview() {
  popupPreview_image.src = popupPreview_image.src; 
  PopupOpen(previewPopup);
}

function handlePreviewFormClose() {
  PopupClose(previewPopup);
}

// Обработчик «отправки» формы, хотя пока 
// она никуда отправляться не будет 
function handleFormSubmit (evt) { 
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
                                                // Так мы можем определить свою логику отправки. 
                                                // О том, как это делать, расскажем позже. 
  // Получите значение полей jobInput и nameInput из свойства value 
  let nameInputValue = nameInput.value; 
  let jobInputValue = jobInput.value; 
  // Выберите элементы, куда должны быть вставлены значения полей 
  let profileFullname = document.querySelector('.profile__fullname'); 
  let profileDescr = document.querySelector('.profile__descr'); 
  // Вставьте новые значения с помощью textContent 
  profileFullname.textContent = nameInput.value; 
  profileDescr.textContent = jobInput.value; 
  closePopupProfile(); 
} 

function handleElementFormSubmit (evt) { 
  evt.preventDefault();
  const elementName =nameElementInput.value; 
  const elementUrl =urlElementInput.value; 
  const cardForAdd = [
   {
      name:  elementName,
      link: elementUrl
    }];
    cardForAdd.forEach(function(card){
      elementCard = createElement(card);
      elementContainer.insertBefore(elementCard, elementContainer.firstElementChild);
    }); 
  closePopupElement(); 
}

openPopupBnt.addEventListener('click', openPopupProfile ); 
closePopupBtn.addEventListener('click', closePopupProfile ); 
elementPopupBtn.addEventListener('click', openPopupElement) ; 
closeElementPopupBtn.addEventListener('click', closePopupElement ); 
popupPreview_close_btn.addEventListener('click', handlePreviewFormClose); 
profileForm.addEventListener('submit', handleFormSubmit); 
elementForm.addEventListener('submit', handleElementFormSubmit); 

