let productLocalStorage = JSON.parse(localStorage.getItem('article'));
console.log(productLocalStorage);
const getEmptyCart = document.getElementById('cart__items');

//Si le panier est vide
function fillCart() {
    if(productLocalStorage === null || productLocalStorage == 0) {
        const emptyCart = '<p>Votre panier est vide</p>';
        getEmptyCart.innerHTML = emptyCart;
    
    //Si le panier contient des éléments, on les insère    
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

//Total des quantités

function totalProduct() {
  let elementQuantity = document.getElementsByClassName('itemQuantity');
  let productLength = elementQuantity.length;
  totalProduct = 0;


  for (let i = 0; i < productLength; i++) {
    totalProduct += elementQuantity[i].valueAsNumber;
  }

  let getTotalQuantity = document.getElementsByClassName('totalQuantity');
  getTotalQuantity.innerHTML = totalProduct;
  console.log(totalProduct);

//le prix total est récupéré

  priceTotal = 0;
  for (let i = 0; i < productLength; ++i) {
    priceTotal += (elementQuantity[i].valueAsNumber * productLocalStorage[i].priceArticle);
  }

  let getProductTotalPrice = document.getElementById('totalPrice');
  getProductTotalPrice.innerHTML = priceTotal;
  console.log(priceTotal);
}