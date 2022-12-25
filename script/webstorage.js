/*
DESCRIPTION
*/



//Check if web storage is enabled in browser settings
function checkStorage() {

  var ws = document.getElementById("local-storage");
  var check = "sampletext";            //Example entry for web storage

  try {
    localStorage.setItem(check, check);           //Store item in web storage
    localStorage.removeItem(check);             //Remove item from web storage
    ws.innerHTML = "Web Storage is enabled. You are good to go.";

  } catch(e) {
    ws.innerHTML = "Web Storage is disabled. Please check your browser settings.";

  }

}



//Clear all data stored in web storage
function clearStorage() {

  localStorage.clear();

}