let hamburgerBtn = document.getElementById('hamburger-btn');
let navbarContainer = document.getElementById('navbar-container');
let navbar = document.getElementById('navbar');
let main = document.getElementById('main');
let trigger = document.getElementById('trigger');

let colorOne = document.getElementById('color-one');
let colorTwo = document.getElementById('color-two');
let colorThree = document.getElementById('color-three');

const facebook = ['#3b5998', '#8b9dc3','#dfe3ee','#f7f7f7', '#003ca1', '#0057e7'];
// const youtube = ['#cc181e', '#2793e8', '#559900', '#666666', '#003ca1', '#0057e7'];
// const google = ['#96ceb4', '#0057e7', '#d62d20', '#ffa700', '#003ca1', '#0057e7'];

// new pallets
const youtube = ['#242582', '#f64c72', '#553d67', '#2f2fa2', '#f64c72', '#99738e'];
const google = ['#5cdb95', '#05386b', '#edf5e1', '#8ee4af', '#05386b', '#379683'];


let previousScroll = 0;
let scrollTriggerPosition = trigger.getBoundingClientRect().top;

function populateUI () {
  const colorThemeArr = JSON.parse(window.localStorage.getItem('color'));
  if (colorThemeArr !== null && colorThemeArr.length > 0) {
    colorTheme(colorThemeArr);
  }
}


function colorTheme(arr) {
  document.documentElement.style.setProperty('--primary-color', arr[0]);
  document.documentElement.style.setProperty('--secondary-color', arr[1]);
  document.documentElement.style.setProperty('--third-color', arr[2]);
  document.documentElement.style.setProperty('--fourth-color', arr[3]);
  document.documentElement.style.setProperty('--btn-color', arr[4]);
  document.documentElement.style.setProperty('--btn-hover-color', arr[5]);
  window.localStorage.setItem('color', JSON.stringify(arr));
}

function toggleOverlay() {
  hamburgerBtn.classList.toggle('hamburger-active');
  overlay.classList.toggle('overlay-active');
  navbarContainer.classList.toggle('navbar-container-hide');
}

function toggleNavbar() {
  let currentScroll = window.scrollY;

  if (currentScroll > scrollTriggerPosition) {
    if (currentScroll > previousScroll) {
      navbarContainer.classList.add('navbar-container-active');
    } else {
      navbarContainer.classList.remove('navbar-container-active');
    }
    previousScroll = currentScroll;
  }
}

function toggleNavbarOnMouse(e) {
  if(e.clientY < 50) {
    navbarContainer.classList.remove('navbar-container-active');
  }
}


hamburgerBtn.addEventListener('click', toggleOverlay);

colorOne.addEventListener('click',() => colorTheme(facebook));
colorTwo.addEventListener('click',() => colorTheme(youtube));
colorThree.addEventListener('click',() => colorTheme(google));

window.addEventListener('scroll', toggleNavbar);

window.addEventListener('resize', ()=> scrollTriggerPosition = trigger.getBoundingClientRect().top);

window.addEventListener('mousemove', (e) => toggleNavbarOnMouse(e))


populateUI();


// Section Projects
// ////////////////////////////////////////////////////////////////////////////

const projectsImages = document.querySelectorAll('.project-thumb img');
const projectNames = document.querySelectorAll('.project-name');
const projectsContainer = document.getElementById('projects-container');

projectNames.forEach((a) => {
  a.addEventListener('click', fadeOut)
});

projectsImages.forEach((img) => img.addEventListener('click', (e) => {
  e.target.parentNode.parentNode.firstElementChild.click()
  })
);

function fadeOut(e) {
  e.preventDefault();
  projectsContainer.classList.add('fadeout');
  document.body.classList.add('color-body');
  setTimeout(() => document.body.classList.add('fadeout-body'), 500);
  setTimeout(() => window.open(e.target.href,"_self"), 1250);
}


// Smooth scrolling
$('.smooth').on('click', function(event) {
    if (this.hash !== '') {
      event.preventDefault();
      const hash = this.hash;
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top
        },
        800
      );
    }
  });
