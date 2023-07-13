class Card {
  constructor (cardElementName, cardElementLink) {
    this._name = cardElementName;
    this._image = cardElementLink;
  }
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector('.card-template')
    .content
    .querySelector('.card')
    .cloneNode(true); 
    // вернём DOM-элемент карточки
    return cardElement;
  } 

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.card__like');
    this._cardDeleteButton = this._element.querySelector('.card__delete');
    this._imagePopup = document.querySelector('.popup-image'); 
    // Добавим данные
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._image;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__info').alt = this._name;
    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  } 

  _setEventListeners() { 
    this._popupImageCloseBtn = document.querySelector('.popup-image__close-btn');

    this._cardImage.addEventListener('click',  (evt) => { this._handleImageClick()});
    
    this._buttonLike.addEventListener('click',  () => { this._handleLike()});

    this._cardDeleteButton.addEventListener('click',  () => { 
      this._handleDelete();  
    });

    this._popupImageCloseBtn.addEventListener('click',  () => { this._handleImageFormClose()}); 
}

 _handleImageFormClose(){
    this._closePopup();
 }

  _closePopup() { 
    //document.removeEventListener('keydown', keyEscHandler);
    //console.log('this._imagePopup');
    console.log(this._imagePopup);
    this._imagePopup.classList.remove('popup_opened'); 
  }

  _handleLike() {
    this._buttonLike.classList.toggle('card__like_active');
  }

  _handleDelete() {
    this._element.remove();
  }

  _handleImageClick() {
    const popupImage = document.querySelector('.popup-image__image'); 
    const popupImageFigcaption = document.querySelector('.popup-image__figcaption'); 

    popupImage.src = this._image;
    popupImage.alt =  this._name;
    popupImageFigcaption.textContent =  this._name;
    this._openPopupImage();
  }

  _openPopupImage() { 
    
    this._imagePopup.classList.add('popup_opened'); 
    //document.addEventListener('keydown', keyEscHandler);
  }
  
}
export default Card;
