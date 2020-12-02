document.addEventListener('DOMContentLoaded', () => {
  // fetchPictureData();
  renderLoginForm();
});

const renderLoginForm = () => {
  
};

const fetchPictureData = () => {
  fetch('http://localhost:3000/pictures')
    .then(res => res.json())
    .then(data => renderPictureData(data))
};

const renderPictureData = (pictures) => {
  const testDiv = document.getElementById('test');
  pictures.forEach(picture => {
    let imgContainer = document.createElement('div');
    let img = document.createElement('img');

    img.src = picture['img_url'];
    img.classList.add('plane-picture');
    imgContainer.classList.add('picture-container');

    testDiv.appendChild(imgContainer);
    imgContainer.appendChild(img);
  });
};