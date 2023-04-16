
let popup = document.querySelector('.popup');
let profileFullname = document.querySelector('.profile__fullname');
let profileDescr = document.querySelector('.profile__descr');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-title');
let openPopupBnt = document.querySelector('.profile__edit-btn');
let closePopupBtn = document.querySelector('.popup__close-btn');
let popupSaveBtn = document.querySelector('.popup__save-btn');

function togglePopupOpen() {
  popup.classList.toggle('popup_open');
}

function openPopup() {
  nameInput.value = profileFullname.innerHTML;
  jobInput.value = profileDescr.innerHTML;
  togglePopupOpen();
}

function closePopupAndSave() {
  profileFullname.innerHTML = nameInput.value;
  profileDescr.innerHTML = jobInput.value;
  togglePopupOpen();
}

openPopupBnt.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', togglePopupOpen);
popupSaveBtn.addEventListener('click', closePopupAndSave);