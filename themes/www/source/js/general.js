
const menuIcon = document.querySelector('.fa-bars');
document.addEventListener("DOMContentLoaded", function () {

  menuIcon.addEventListener('click', openMenu);
  
});

function openMenu () {
  const display = document.querySelector('.menu').style.display;
  if (!display || display === 0) {
    document.querySelector('.menu').style.display = 'block'
  }
  else {
    document.querySelector('.menu').style.display = ''
  }
  

}
$(function () {
  $('.bxslider').bxSlider({
    mode: 'fade',
    captions: true,
    slideWidth: 1600, // tamaño de slider
    auto: true, // para que sea automatico
    keyboardEnabled: true // para que puedas cambiar con
  });
});