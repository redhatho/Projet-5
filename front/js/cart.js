//on recupère le localStorage
let productLocalStorage = JSON.parse(localStorage.getItem('article'));
console.table(productLocalStorage)
let article = '';

getItem();


function getItem() {
  //Affichage si panier vide
  if (productLocalStorage === null || productLocalStorage.length === 0) {
    let emptyStorage = document.createElement('product');
    document.querySelector('#cart__items').appendChild(emptyStorage);
    emptyStorage.textContent = 'Votre panier est vide';
  } else {
    //si le panier n'est pas vide creation des cart article
    for (let products in productLocalStorage) {
      document.getElementById('cart__items').innerHTML+= `<article class="cart__item" data-id="${productLocalStorage[product].idArticle}" data-color="${productLocalStorage[product].colorArticle}">
      <div class="cart__item__img">
      <img src="${productLocalStorage[products].imageUrl}" alt="${productLocalStorage[products].altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${productLocalStorage[products].nameArticle}</h2>
          <p>${productLocalStorage[products].colorArticle}</p>
          <p>${productLocalStorage[products].price + '€'}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>${productLocalStorage[products].quantityArticle} : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
    }
  }
}

