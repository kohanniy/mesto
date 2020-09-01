const keyHandler = evt => {
  if (evt.key === 'Enter') {
    placeFormSubmitHandler;
  }
};

placeName.addEventListener('keydown', keyHandler);

pictureLink.addEventListener('keydown', keyHandler);
