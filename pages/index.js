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
  //console.log(elementTemplate);
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

  elementDeleteButton.addEventListener('click', handleDelete);
  elementLikeButton.addEventListener('click', handleLike);

  return element;
}

initialCards.forEach(function(card){
  element = createElement(card);
  elementContainer.appendChild (element);
}

)
createElement(initialCards);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
let popup = document.querySelector('.popup');
let openPopupBnt = document.querySelector('.profile__edit-btn');
let closePopupBtn = document.querySelector('.popup__close-btn');
let profileFullname = document.querySelector('.profile__fullname');
let profileDescr = document.querySelector('.profile__descr');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

function togglePopupOpen() {
  popup.classList.toggle('popup_opened');
}

function openPopup() {
  nameInput.value = profileFullname.textContent;
  jobInput.value = profileDescr.textContent;
  togglePopupOpen();
}

openPopupBnt.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', togglePopupOpen);

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
  togglePopupOpen();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

