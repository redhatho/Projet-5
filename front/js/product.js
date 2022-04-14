const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");
console.log(idProduct);

const quantityProduct = document.getElementById('quantity')
let colorOption = document.querySelector("#colors");

function getApiProducts() {

  //test d'insertion des éléments (ne fonctionne pas)
  let imageAlt = document.querySelector("article div.item__img");
  let titre = document.querySelector("#title");
  let price = document.querySelector("#price");
  let description = document.querySelector("#description");
  

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

}

//Récupération de l'Api et de l'Id du produit
fetch("http://localhost:3000/api/products/" + idProduct)
  .then(response => response.json())
    .then(function (productFromApi){
        product = productFromApi;
        getApiProducts();
        console.table(productFromApi);
        let addProduct =  document.getElementById("addToCart");
        let addColor = document.getElementById("colors");
        
        addProduct.addEventListener("click", () => {
          
          let selectedProduct = {
            id: idProduct,
            qts: quantityProduct.value,
            color: colorOption.value,
          }

          if (quantityProduct.value > 0 && quantityProduct.value <=100 && quantityProduct.value != 0){
            let pickColor = addColor.value;
            let pickQuantity = quantityProduct.value;

            let optionProduct = {
              idArticle : idProduct,
              colorArticle : pickColor,
              quantityArticle : Number(pickQuantity),
              nameArticle : product.name,
              priceArticle : product.price,
              descriptionArticle : product.description,
              imgArticle : product.imgageUrl,
              altImgArticle : product.altTxt,
            };
          
          //On initie le local storage
          let productLocalStorage = JSON.parse(localStorage.getItem("article"));
          console.log(productLocalStorage);

          //on créer unesuite une alerte d'indication en cas de choix
          const altertConfirmation =() =>{
            if(window.confirm(`Votre commande de ${pickQuantity} ${product.name} ${pickColor} a été ajoutée au panier
      Pour consulter votre panier, cliquez sur OK`)){
                window.location.href ="cart.html";
            }
        }

          //Si le panier comporte a moins un article

          if (productLocalStorage) {
            const resultFind = productLocalStorage.find(
              (el) => el.idArticle === idProduct && el.colorArticle === pickColor);
              
              //Si le produit commandé est déjà dans le panier
              if (resultFind) {
                let newQuantity = parseInt(optionProduct.quantityArticle) + parseInt(resultFind.quantityArticle);
                resultFind.quantityArticle = newQuantity;
                localStorage.setItem("article", JSON.stringify(productLocalStorage));
                console.log(productLocalStorage);
                altertConfirmation();
              
              //Si le produit n'est pas dans le panier
              } else {
                productLocalStorage.push(optionProduct);
                localStorage.setItem("article", JSON.stringify(productLocalStorage));
                console.log(productLocalStorage);
                altertConfirmation();
              }

              //Si le panier est vide
          } else {
            productLocalStorage =[];
            productLocalStorage.push(optionProduct);
            localStorage.setItem("article", JSON.stringify(productLocalStorage));
            console.log(productLocalStorage);
            altertConfirmation();
          }

          };

          /* ETAPE 1
          vérifier qu'une color et une quantité sont choisi avant de créer l'objet selectedProduct => une alerte
          ajouter selectedProduct dans un tableau qui contiendra tout les produits
          ajouter le tableau dans le localStorage
          
        


          */ 
         /* ETAPE 2
         Après le condition color/quantité
         vérifié si l'ID + la color du produit selectionner par l'utilisateur existe déjà dans le panier
         find() *
         findInex()
         filter()
         
         
         */
        /* ETAPE 3
        SI le produit (id +color) n'existe pas dans le panier => l'ajouter au panier
        SI le produit (id + color) existe =W additionner les quantités
        
        */
          console.log(selectedProduct)
        })
        
    })
    .catch (function(error){
        return error;
    });

    



    