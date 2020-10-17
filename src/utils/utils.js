//Обработка ошибок, попадающих в catch
export function rejectPromise(err) {
  console.log(err);
}

//Состояние кнопок, пока данные загружаются
export function renderLoading(popup, isLoading) {
  if (isLoading) {
    popup.defaultButton.style.display = 'none';
    popup.isLoadingButton.style.display = 'block';
  } else {
      popup.defaultButton.style.display = 'block';
      popup.isLoadingButton.style.display = 'none';
    }
}
