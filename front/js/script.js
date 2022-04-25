//Récupération des produits de L'API
fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  // Répartition des données de l'API dans le DOM
  .then(function (productFromApi) {
    const products = productFromApi;
    for (let product in products) {// Insertion des éléments contenu dans l'API dans l'index
      document.getElementById('items').innerHTML += `<a href="product.html?id=${productFromApi[product]._id}">
        
        <article>
          <img src="${productFromApi[product].imageUrl}" alt="${productFromApi[product].altTxt}">
          <h3 class="name">${productFromApi[product].name}</h3>
          <p class="description">${productFromApi[product].description}</p>
        </article>

      </a>`}
  })
  .catch(function (error) {
    return error;
  });