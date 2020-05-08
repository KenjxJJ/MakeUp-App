'use strict'

// Fetch items 
async function fetchProducts(){
      
     const itemsResponse = await fetch('./data/products.json');
     const products =  await itemsResponse.json();
      displayProducts(products);
};

function displayProducts(products) {
   const displayByID = document.querySelector('.products');
         
    displayByID.innerHTML =  products.map( product =>  ` 
    
        <div class='product'>
         <img class="displayed_image" src=${product.image_link} alt="">
         <div class='about_product'>
                Name : ${product.name}<br>
                Currency : ${product.currency}<br>
                Price : ${product.price_sign} ${product.price} <br>
                Click to see the <em><a href=${product.website_link}>product.</a></em>
           </div>
        </div>
        `).join('\n');
}

fetchProducts();