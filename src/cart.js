let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

/**
 * ! Generates the Cart Page with product cards composed of
 * ! images, title, price, buttons, & Total price
 * ? When basket is blank -> show's Cart is Empty
 */

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];
        let { img, price, name , desc } = search;
        return `
      <div class="cart-item">
        <img width="100" src=https://drive.google.com/uc?export=download&id=${img} alt="${name}" />


        

        <div class="details">




         <div class="product">
                
                <div class="popup-view">
                  <div class="popup-card">
                    <a><i class="fas fa-times close-btn"></i></a>
                    <div class="product-img">
                      <img src="https://drive.google.com/uc?export=download&id=${img}" alt="${name}">
                    </div>
                    <div class="info">
                      <h2><br><span>${name}</span></h2>
                      <p>${desc ? desc : "Sin descripcion"}</p>
                      <span class="price"></span>
                      
                      <a href="#" class="add-wish"></a>
                    </div>
                  </div>
                </div>
              </div>


        
        
          <div class="title-price-x">
            <h4 class="title-price">
              
              <p class="cart-item-price"> ${name}</p>

            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-circle"></i>
          </div>
          


          <div class="cart-buttons">
          <h4><a href="#" class="popup-btn title-price-x" style="color:black">Ver receta</a></h4>
            <div class="buttons"> 
              <i onclick="decrement(${id})" class=""></i>
              <div id=${id} class="quantity"></div>
              </div>
            
          </div>

          
          
          
        
        </div>

      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>Seccion de favoritos vacia</h2>
    <a href="cocteles.html">
      <button class="HomeBtn">Regresar a seccion de cocteles</button>
    </a>
    `;
  }
};

generateCartItems();









var popupViews = document.querySelectorAll('.popup-view');
var popupBtns = document.querySelectorAll('.popup-btn');
var closeBtns = document.querySelectorAll('.close-btn');

/*
var shareBtn = document.querySelectorAll('#shareBtn');
// const title = window.document.title;
var url = window.document.location.href;
var compartir = function share(){
// Check for Web Share api support
if (navigator.share) {
// Browser supports native share api
navigator.share({
text: 'Echale un vistazo a este coctel: ',
//title:`${title}`,
url: `${url}`
}).then(() => {
console.log('Thanks for sharing!');
})
.catch((err) => console.error(err));
} else {
// Fallback
alert("Tu navegador no soporta esta funcion. Porfavor , Comparte este link manualmente :D")
}
}
shareBtn.forEach((shareBtn,i)=>{
  shareBtn.addEventListener("click", ()=>{
    compartir(i);
  })
})

*/
//javascript for quick view button
var popup = function(popupClick){
  popupViews[popupClick].classList.add('active');
}


/*FUNCION compartir*/
popupBtns.forEach((popupBtn, i) => {
  popupBtn.addEventListener("click", () => {
    popup(i);
  });

  //shareBtn.addEventListener('click',compartir);
  
});







//javascript for close button
closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    popupViews.forEach((popupView) => {
      popupView.classList.remove('active');
    });
  });
});













/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item = 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

/**
 * ! Used to remove 1 selected product card from basket
 * ! using the X [cross] button
 */

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Used to calculate total amount of the selected Products
 * ! with specific quantity
 * ? When basket is blank, it will show nothing
 */

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML =
      
      //<button class="checkout">Checkout</button>
      `
    
    
    <button onclick="clearCart()" class="removeAll">Clear All Favorites</button>
    `);
  } else return;
};

TotalAmount();

/**
 * ! Used to clear cart, and remove everything from local storage
 */

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
