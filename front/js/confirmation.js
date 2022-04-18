//On récupère la commande via le local storage
const str = window.location.href;
const url = new URL(str);
const orderId = url.searchParams.get("orderId");

//On l'insère dans la page de confirmation
let productOrder = document.getElementById('orderId');
productOrder.innerHTML = orderId + '<br> Merci de votre commande !';

//Supression du local Storage une fois la commande passée
let removeLocalStorage = window.localStorage;
removeLocalStorage.clear();