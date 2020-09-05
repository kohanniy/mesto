//Находим невалидные поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Показываем ошибку
const showInputError = (formElement, inputElement, errorMessage, formObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObj.inputErrorClass);
  errorElement.textContent = errorMessage;
};

//Скрываем ошибку
const hideInputError = (formElement, inputElement, formObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObj.inputErrorClass);
  errorElement.textContent = '';
};

//Указываем, когда показывать ошибку, а когда скрывать
const isValid = (formElement, inputElement, formObj) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObj);
  } else {
      hideInputError(formElement, inputElement, formObj);
    }
};

//Задаем состояние включенной кнопки
const includedSubmitButton = (buttonElement, formObj) => {
  buttonElement.classList.remove(formObj.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);
}

//Задаем состояние выключенной кнопки
const disabledSubmitButton = (buttonElement, formObj) => {
  buttonElement.classList.add(formObj.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

//Меняем состояние кнопки в зависимости от валидности полей
const toggleButtonState = (inputList, buttonElement, formObj) => {
  if (hasInvalidInput(inputList)) {
    disabledSubmitButton (buttonElement, formObj);
  } else {
     includedSubmitButton(buttonElement, formObj);
    }
};

//Добавляем обработчик каждому полю
const setEventListeners = (formElement, formObj) => {
  const inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));
  const buttonElement = formElement.querySelector(formObj.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, formObj);
      toggleButtonState(inputList, buttonElement, formObj);
    });
  });
};

//Включаем валидацию форм
const enableValidation = (formObj) => {
  const formList = Array.from(document.querySelectorAll(formObj.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, formObj);
  });
};

//Функция очистки ошибок полей ввода
const clearErrors = (formElement, formObj) => {
  const inputList = formElement.querySelectorAll(formObj.inputSelector);

  inputList.forEach((inputElement) => {
    if (inputElement.classList.contains(formObj.inputErrorClass)) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(formObj.inputErrorClass);
      errorElement.textContent = '';
    }
  });
};

enableValidation(formObj);
