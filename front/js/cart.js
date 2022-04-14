let productLocalStorage = JSON.parse(localStorage.getItem("article"));
console.log(productLocalStorage);
const getEmptyCart = getElementById("#art__items");

//Si le panier est vide
function fillCart() {
    if(productLocalStorage === null || productLocalStorage == 0) {
        const emptyCart = '<p>Votre panier est vide</p>';
        getEmptyCart.innerHTML = emptyCart;
    
    //Si le panier contient des éléments, on les insèrent    
    } else {
        for(let product of productLocalStorage) {
            document.getElementById('cart__items').innerHTML+= `<article class="cart__item" data-id="${productLocalStorage[product].idArticle}" data-color="{product-color}">
            <div class="cart__item__img">
              <img src="${productLocalStorage[product].imgArticle}" alt="${productLocalStorage[product].ImgArticle}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${productLocalStorage[product].nameArticle}</h2>
                <p>${productLocalStorage[product].colorArticle}</p>
                <p>${productLocalStorage[product].priceArticle}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
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

