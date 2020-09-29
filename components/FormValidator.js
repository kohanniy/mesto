export default class FormValidator {
  constructor(formObj, formElement) {
    this._inputSelector = formObj.inputSelector;
    this._submitButtonSelector = formObj.submitButtonSelector;
    this._inactiveButtonClass = formObj.inactiveButtonClass;
    this._inputErrorClass = formObj.inputErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));
    this._submitButton = formElement.querySelector(formObj.submitButtonSelector);
  }

  //показываем или скрываем ошибку в зависимости от валидности полей
  _checkInputValidity() {
    this._inputList.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
      } else {
          const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

          inputElement.classList.remove(this._inputErrorClass);
          errorElement.textContent = '';
        }
    });
  }

  //находим невалидные поля
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //задаем состояние отключенной кнопки
  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }

  //задаем состояние рабочей кнопки
  enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  //меняем состояние кнопки в зависимости от валидности полей
  _toggleSubmitButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
        this.enableSubmitButton();
      }
  }

  //скрываем ошибки во время повторного открытия неотправленной формы
  hideErrors() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
    });
  }

  //задаем обработчики форме и полям
  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity();
        this._toggleSubmitButtonState();
      });
    });
  }

  //включаем валидацию
  enableValidation() {
    this._setEventListeners();
  }
}
