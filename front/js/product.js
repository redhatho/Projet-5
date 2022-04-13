const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");
console.log(idProduct);
//Il y a sans doute une erreur dans l'obtiention des params, à checker. L'id est pourtant récupéré
/* Vérifier si le localStorage existe sinon le créer (initialiser une tableau vide)*/
const quantityProduct = document.getElementById('quantity')
let colorOption = document.querySelector("#colors");
//Récupération de l'Api et de l'Id du produit
fetch("http://localhost:3000/api/products/" + idProduct)
  .then(response => response.json())
    .then(function (productFromApi){
        product = productFromApi;
        getApiProducts();
        console.table(productFromApi);
        let addProduct =  document.getElementById("addToCart");
        let addColor = document.getElementById("colors")
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

          //on créer unesuite une alerte d'indication en cas de choix


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

    //document.getElementById('items').innerHTML+= `<a href="product.html?id=${productFromApi[product]._id}"> et mettre ça pour les autres éléments, ça fera quelques lignes
    //retourner l'undefined, ça veut dire qu'on a les params mais pas le contenu

    //document.querySelector('items').innerHTML+=<h3 class="name">${productFromApi[product].name}</h3>
    //
    //
    //
    //