document.addEventListener('DOMContentLoaded', () => {
  // fetchPictureData();
  hideForm();
  loginButtonListener();
  submitFormListener();
});

const hideForm = () => {
  const loginForm = document.getElementById('login-form');
  loginForm.style.display = 'none';
};

const loginButtonListener = () => {
  const newUserButton = document.getElementById('new-user');
  const returningUserButton = document.getElementById('returning-user')

  newUserButton.addEventListener('click', () => {
    renderNewUserForm();
  });

  returningUserButton.addEventListener('click', () => {
    renderReturningUserForm();
  });
};

const renderNewUserForm = () => {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('new-user-inputs').style.display = 'block';
};

const renderReturningUserForm = () => {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('new-user-inputs').style.display = 'none';
};

const submitFormListener = () => {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
  });
};




// const fetchPictureData = () => {
//   fetch('http://localhost:3000/pictures')
//     .then(res => res.json())
//     .then(data => renderPictureData(data))
// };

// const renderPictureData = (pictures) => {
//   const testDiv = document.querySelector('body');
//   pictures.forEach(picture => {
//     let imgContainer = document.createElement('div');
//     let img = document.createElement('img');

//     img.src = picture['img_url'];
//     img.classList.add('plane-picture');
//     imgContainer.classList.add('picture-container');

//     testDiv.appendChild(imgContainer);
//     imgContainer.appendChild(img);
//   });
// };