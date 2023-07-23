class Card {
  constructor (cardTemplateSelector, cardElementName, cardElementLink, callbackForOpenImage) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._name = cardElementName;
    this._image = cardElementLink;  
    this._callbackForOpenImage = callbackForOpenImage;
  }
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._cardTemplateSelector) 
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
    // Добавим данные
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._image;
    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  } 

  _setEventListeners() { 
 
    this._cardImage.addEventListener('click',  () => {this._callbackForOpenImage(this._name, this._image)});
    this._buttonLike.addEventListener('click',  () => { this._handleLike()});
    this._cardDeleteButton.addEventListener('click',  () => { 
      this._handleDelete();  
    });

     
}
 

  _handleLike() {
    this._buttonLike.classList.toggle('card__like_active');
  }

  _handleDelete() {
    this._element.remove();
  }
 
}

export default Card;
