//on recupère le localStorage
let productLocalStorage = JSON.parse(localStorage.getItem('article'));
console.table(productLocalStorage)
let article = '';



// on fetch pour récupèrer le prix dans l'api
fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((data) => {
    if (productLocalStorage) {
      for (money of productLocalStorage) {
        const product = data.find((articleData) => articleData._id === money.idArticle);
        if (product) {
          money.price = product.price;
        }
      }
    }
    getProduct();
    totalPrice();
    modifyQuantity();
    deleteProduct();
    getSurvey();
    orderSurvey();
  })
  .catch (function(error){
    return error;
});

function getProduct() {
  //Affichage si panier vide
  if (productLocalStorage === null || productLocalStorage.length === 0) {
    let emptyStorage = document.createElement('product');
    document.querySelector('#cart__items').appendChild(emptyStorage);
    emptyStorage.textContent = 'Votre panier est vide';
  } else {
    //si le panier n'est pas vide creation des cart article
    for (let products in productLocalStorage) {
      document.getElementById('cart__items').innerHTML+= `<article class="cart__item" data-id="${productLocalStorage[products].idArticle}" data-color="${productLocalStorage[products].colorArticle}">
      <div class="cart__item__img">
      <img src="${productLocalStorage[products].imgArticle}" alt="${productLocalStorage[products].altImgArticle}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${productLocalStorage[products].nameArticle}</h2>
          <p>${productLocalStorage[products].colorArticle}</p>
          <p>${productLocalStorage[products].price + '€'}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLocalStorage[products].quantityArticle}">
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

//On calcule le prix total
function totalPrice () {
  //Calcul de la quantité de produits
  let elementQuantity = document.getElementsByClassName('itemQuantity');
  let totalQuantity = 0;

  for(let i = 0; i < elementQuantity.length; i++) {
    totalQuantity += elementQuantity[i].valueAsNumber;
  }

  let totalQuantityProdcuts = document.getElementById('totalQuantity');
  totalQuantityProdcuts.textContent = totalQuantity;

  //On permet le calcul total du prix
  let totalCost = 0;
  for(let i = 0; i < elementQuantity.length; i++) {
    totalCost += elementQuantity[i].valueAsNumber * productLocalStorage[i].price
  }
  let totalProdcutCost = document.getElementById('totalPrice');
  totalProdcutCost.textContent = totalCost;

}

//On permet la modification de la quantité de produit
function modifyQuantity() {
  const changeQuantity = document.querySelectorAll('.itemQuantity');
  for(let i = 0; i < changeQuantity.length; i++) {
    changeQuantity[i].addEventListener('change', function(event) {
      event.preventDefault();
      productLocalStorage[i].quantityArticle = event.target.value;

      if (productLocalStorage[i].quantityArticle == 0 || productLocalStorage[i].quantityArticle > 100) {
        alert('Veuillez choisir une quantité comprise entre 1 et 100');
        location.reload();
      } else {
        localStorage.setItem('article', JSON.stringify(productLocalStorage));
        totalPrice();
      }

    });
  }
}

//Supression d'un produit
function deleteProduct() {
  const deleteArticle = document.querySelectorAll('.deleteItem');
  for (let elt = 0; elt < deleteArticle.length; elt++) {
    deleteArticle[elt].addEventListener('click', (action) => {
      action.preventDefault();
      //demande de confirmation de la suppression de l'article
      if (
        window.confirm(
          `Vous allez supprimer ${productLocalStorage[elt].quantityArticle} ${productLocalStorage[elt].nameArticle} de couleur ${productLocalStorage[elt].colorArticle} de votre panier. Confirmer.`
        )
      ) {
        let idDeleteArticle = productLocalStorage[elt].idArticle;
        let colorDeleteArticle = productLocalStorage[elt].colorArticle;

        productLocalStorage = productLocalStorage.filter(
          (element) =>
            element.idArticle !== idDeleteArticle || element.colorArticle !== colorDeleteArticle
        );
        localStorage.setItem('article', JSON.stringify(productLocalStorage));
        location.reload();
      }
    });
  }
}

//Le formulaire

//On défini les RegEx
let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let addressRegex = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');

function getSurvey() {
  //Prénom
  let firstName = document.getElementById('firstName');
  firstName.addEventListener('input', function() {
    if(nameRegex.test(firstName.value) === false) {
      document.getElementById('firstNameErrorMsg').textContent = 'Le format du prénom est incorrect';
    } else {
      document.getElementById('firstNameErrorMsg').textContent = '';
    }

  });

  //Nom
  let lastName = document.getElementById('lastName');
  lastName.addEventListener('input', function() {
    if(nameRegex.test(lastName.value) === false) {
      document.getElementById('lastNameErrorMsg').textContent = 'Le format du nom est incorrect';
    } else {
      document.getElementById('lastNameErrorMsg').textContent = '';
    }

  });

  //Adresse
  let address = document.getElementById('address');
  address.addEventListener('input', function() {
    if(addressRegex.test(address.value) === false) {
      document.getElementById('addressErrorMsg').textContent = "Le format de l'adresse est incorrect";
    } else {
      document.getElementById('addressErrorMsg').textContent = '';
    }

  });

  //City
  let city = document.getElementById('city');
  city.addEventListener('input', function() {
    if(nameRegex.test(city.value) === false) {
      document.getElementById('cityErrorMsg').textContent = 'Le format de la ville est incorrect';
    } else {
      document.getElementById('cityErrorMsg').textContent = '';
    }

  });

  //Email
  let email = document.getElementById('email');
  email.addEventListener('input', function() {
    if(emailRegex.test(email.value) === false) {
      document.getElementById('emailErrorMsg').textContent = "Le format de l'email est incorrect";
    } else {
      document.getElementById('emailErrorMsg').textContent = '';
    }

  });

}

function orderSurvey() {
  const order = document.getElementById('order');

  order.addEventListener('click', (action) => {
    action.preventDefault();

    if(!productLocalStorage) {
      altert('Votre panier est vide, veuillez sélectionner un article pour passer votre commande');
    }

    //Si le formulaire n'est pas rempli correctement on créer une alerte
    else if(!nameRegex.test(firstName.value) || !nameRegex.test(lastName.value) || !addressRegex.test(address.value) || !emailRegex.test(email.value) || !nameRegex.test(city.value)) {
      alert('Veuillez remplir correctement tous les champs du formulaire');
    } else {

      //Construction d'un array qu'on mettra dans le local storage
      let finalProduct = [];
      for(let i = 0; i < productLocalStorage.length; i++) {
        finalProduct.push(productLocalStorage[i].idArticle);
      }

      //objet contenant les informations du formulaire
      let infoClient = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: finalProduct,
      };
      console.log(infoClient);

      //On initie la fonction "Post"
      const postOptions = {
        method: 'POST',
        body: JSON.stringify(infoClient),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      };
      //On récupère l'api et ce qu'il y a a poster
      fetch('http://localhost:3000/api/products/order', postOptions)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const orderId = data.orderId;
          //Et on renvoi vers la page de confirmation
          window.location.href = 'confirmation.html' + '?orderId=' + orderId;
        })
        .catch((error) => {
          alert(error);
      });

    }

  });
}