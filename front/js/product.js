const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");
let product = '';

const quantityProduct = document.getElementById('quantity')
let colorOption = document.getElementById("colors");

//Récupération de l'Api et de l'Id du produit
fetch("http://localhost:3000/api/products/" + idProduct)
  .then(response => response.json())
  .then(function (productFromApi) {
    product = productFromApi;
    getApiProducts();

    function getApiProducts() {
      //insertion des éléments 
      let imageAlt = document.querySelector("article div.item__img");
      let titre = document.getElementById("title");
      let price = document.getElementById("price");
      let description = document.getElementById("description");

      // Insertion de l'image
      imageAlt.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
      // titre "h1"
      titre.textContent = `${product.name}`;
      // le prix
      price.textContent = `${product.price}`;
      // la description
      description.textContent = `${product.description}`;
      // Insertion des options de couleurs par une boucle for
      for (let color of product.colors) {
        colorOption.innerHTML += `<option value="${color}">${color}</option>`;
      }
      //On appelle la fonction clickProduct
      clickProduct(product);
    }

    function clickProduct(product) {
      let addProduct = document.getElementById("addToCart");
      //Ajout de l'évènement
      addProduct.addEventListener("click", () => {

        let qts = quantityProduct.value;
        let color = colorOption.value;

        if (qts == 0 || qts > 100 || color == null || color == "") {
          alert('Veuillez ajouter une quantité comprise entre 1 et 100 puis une couleur');
        } else {
          //On récupère les éléments qui seront ajouté au panier
          let selectedProduct = {
            idArticle: idProduct,
            colorArticle: color,
            quantityArticle: Number(qts),
            nameArticle: product.name,
            descriptionArticle: product.description,
            imgArticle: product.imageUrl,
            altImgArticle: product.altTxt,
          };

          //On initie le local storage
          let productLocalStorage = JSON.parse(localStorage.getItem('article'));

          //On créer une alerte si l'utilisateur ajoute des articles dans le panier
          const alertConfirmation = () => {
            if (window.confirm(`${qts} ${product.name} de couleur ${color} a bien été ajouté à votre panier, pour le consulter veuillez appuyer sur OK `)
            ) {
              //envoie l'utilisateur sur la page panier
              window.location.href = 'cart.html';
            } else {
              //On recharge la page
              location.reload();
            }
          };

          if (productLocalStorage) {
            const resultFind = productLocalStorage.find(
              (el) => el.idArticle === idProduct && el.colorArticle === color);
            if (resultFind) {
              //S'il y a déjà un même produit avec une même couleur
              let totalQuantity = parseInt(selectedProduct.quantityArticle) + parseInt(resultFind.quantityArticle);
              resultFind.quantityArticle = totalQuantity;
              localStorage.setItem('article', JSON.stringify(productLocalStorage));
              alertConfirmation();
            } else {
              //Si le produit est différent de ceux qui ont déjà été commandée
              productLocalStorage.push(selectedProduct);
              localStorage.setItem('article', JSON.stringify(productLocalStorage));
              alertConfirmation();
            }
          } else {
            //S'il n'y a rien dans le panier
            productLocalStorage = [];
            //On push les informations du localStorage dans le array
            productLocalStorage.push(selectedProduct);
            localStorage.setItem('article', JSON.stringify(productLocalStorage));
            alertConfirmation();
          }
        }
      })
    }
  })
  .catch(function (error) {
    return error;
  });

