/*
DESCRIPTION
*/



//
function openPopup(headline, information) {
  var popup = document.getElementById("popup-information");

  headline = headline.toUpperCase();

  document.getElementById("popup-head-text").innerHTML = headline;
  document.getElementById("popup-info-text").innerHTML = information;

  popup.classList.add("open-popup-information");
}



//
function closePopup() {
  var popup = document.getElementById("popup-information");

  document.getElementById("popup-head-text").innerHTML = "HEADLINE";
  document.getElementById("popup-info-text").innerHTML = "Information";

  popup.classList.remove("open-popup-information");
}