'use strict'
const displayProducts = (products) => {
    const displayByID = document.querySelector('.products');

    displayByID.innerHTML = products.map(product => ` 
           <div class='product'>
             <img class="displayed_image" data-src=${product.image_link} alt=""/>
             <div class='about_product'>
                    Name : ${product.name}<br>
                    Currency : ${product.currency}<br>
                    Price : ${product.price_sign} ${product.price} <br>
                    Click to see the <em><a href=${product.website_link}>product.</a></em>
               </div>
            </div>
            `).join('\n');
}

// Fetch items 
async function fetchProducts() {
    const itemsResponse = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
    const products = await itemsResponse.json();
    displayProducts(products);
    lazyLoad();
};


fetchProducts();

// Hamburger Icon

document.getElementById('myHamburger').addEventListener('click', openNav, true);
document.querySelector('.closebtn').addEventListener('click', closeNav, false);

function openNav() {
    document.querySelector('.header').classList.add('revealFromLeft');
    document.body.classList.add('shiftRight');
}

function closeNav() {
    document.querySelector(".header").classList.remove('revealFromLeft');
    // For opacity choice
    document.body.classList.remove('shiftRight');
    document.body.classList.add('shiftLeft');
}

// lazy load images
function lazyLoad() {
    const images = document.querySelectorAll('[data-src]');
    console.log(images);
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0.5
    };

    let observer = new IntersectionObserver(function(entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`Image ${entry.target.src} is in the viewport!`);
                preloadImage(entry.target);
                // Stop watching and load the image
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) { return; }
        img.src = src;
    }
} // end function lazyLoad