document.addEventListener('DOMContentLoaded', () => {
  fetchPictureData();
});

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

    testDiv.appendChild(imgContainer);
    imgContainer.appendChild(img);
  });
};