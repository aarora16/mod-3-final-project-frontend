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
    removeBottomMarginFromHeader();
  });

  returningUserButton.addEventListener('click', () => {
    renderReturningUserForm();
    removeBottomMarginFromHeader();
  });
};

const removeBottomMarginFromHeader = () => {
  const loginText = document.getElementById('header');
  loginText.style.marginBottom = '10%';
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
    postUserToAPI(event.target);
  });
};

const postUserToAPI = (form) => {
  const firstName = form.querySelector('#first-name-input').value;
  const lastName = form.querySelector('#last-name-input').value;
  const username = form.querySelector('#username-input').value;

  fetch('http://localhost:3000/spotters')
    .then(res => res.json())
    .then(data => verifyUsername(data, username))
};

const verifyUsername = (data, username) => {
  const errorNotice = document.getElementById('error-notice');
  let validUser = '';

  data.forEach(spotter => {
    if (spotter.username == username) {
      validUser = spotter.id;
    };
  });

  if (validUser != '') {
    renderUserPictures(validUser);
  } else {
    errorNotice.innerText = "Sorry that isn't quite right."
  };
};

const renderUserPictures = (userId) => {
  document.querySelector('.login-container').innerHTML = '';
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