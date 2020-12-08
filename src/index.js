document.addEventListener('DOMContentLoaded', () => {
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

  if (firstName && lastName && username) {
    fetch('http://localhost:3000/spotters'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
      })
    }
  } else {
    fetch('http://localhost:3000/spotters')
    .then(res => res.json())
    .then(data => verifyUsername(data, username))
  }
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
    displayUserInfo(validUser);
  } else {
    errorNotice.innerText = "Sorry that isn't quite right."
  };
};

const displayUserInfo = (userId) => {
  fetch(`http://localhost:3000/spotters`)
    .then(res => res.json())
    .then(data => submitUserData(data, userId));
};

const submitUserData = (data, userId) => {
  data.forEach(spotter => {
    if (spotter.id == userId) {
      renderUserData(spotter);
    };
  });
};

const renderUserData = (userData) => {
  fetch('http://localhost:3000/pictures')
    .then(res => res.json())
    .then(data => renderUserPictures(data, userData))
};

const renderUserPictures = (pictureData, userData) => {
  const body = document.querySelector('body');
  body.innerHTML = '';
  createUserHeading(userData);
  const pictureDiv = document.createElement('div');
  pictureDiv.classList.add('pictures');
  body.appendChild(pictureDiv);


  pictureData.forEach(picture => {
    if (picture['spotter_id'] == userData['id']) {
      createPictureElement(picture);
    };
  });
  createPictureButton();
};

const createImageGallery = () => {
  fetch('http://localhost:3000/pictures')
    .then(res => res.json())
    .then(data => {
      data.forEach(picture => {
        createPictureElement(picture);
      })
    })
};

const createUserHeading = (userData) => {
  const body = document.querySelector('body');
  const headingContainer = document.createElement('div');
  const heading = document.createElement('h1');
  const yourGallery = document.createElement('h3');

  yourGallery.innerText = 'Your Gallery';
  heading.innerText = `Welcome Back ${userData['first_name']}`;
  headingContainer.classList.add('user-welcome');

  headingContainer.appendChild(heading);
  headingContainer.appendChild(yourGallery);
  body.appendChild(headingContainer);
};

const createPictureElement = (picture) => {
  const pictureDiv = document.querySelector('.pictures');
  const imgContainer = document.createElement('div');
  const img = document.createElement('img');
  const desc = document.createElement('div');
  const a = document.createElement('a');

  a.target = '_blank';
  a.href = picture['img_url'];
  imgContainer.classList.add('gallery');
  img.src = picture['img_url'];
  img.width = '600';
  img.height = '400';
  desc.innerText = picture.description;
  desc.classList.add('desc');
  
  a.appendChild(img);
  imgContainer.appendChild(a);
  imgContainer.appendChild(desc);
  pictureDiv.appendChild(imgContainer);
};

const createPictureButton = () => {
  const pictures = document.querySelector('.pictures');
  const allPicturesButton = document.createElement('button');
  const backButton = document.createElement('button');
  const buttonDiv = document.createElement('div');

  buttonDiv.classList.add('buttons');
  allPicturesButton.classList.add('action-button', 'other-button');
  backButton.classList.add('action-button', 'other-button');

  allPicturesButton.innerText = 'All Pictures';
  backButton.innerText = 'Back';

  buttonDiv.appendChild(allPicturesButton);
  buttonDiv.appendChild(backButton);
  pictures.appendChild(buttonDiv);

  allPicturesListener(allPicturesButton);
  backButtonListener(backButton);
};

const allPicturesListener = (button) => {
  button.addEventListener('click', () => {
    document.querySelector('.pictures').innerHTML = '';
    document.querySelector('h3').innerText = 'All Pictures';
    createImageGallery();
    createPictureButton();
  });
};

const backButtonListener = (button) => {
  button.addEventListener('click', () => {
    location.reload();
  });
};