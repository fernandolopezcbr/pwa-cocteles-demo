let shop = document.getElementById("shop");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, desc, img, price ,category } = x;
      let search = basket.find((y) => y.id === id) || [];


      let 
       resultado =  `

       <div class="card ${category}"> 
       <div id=product-id-${id} class="item">
         <img  src=https://drive.google.com/uc?export=download&id=${img}  alt="${name}" class="popup-btn" href="#"> 
         
         
   
         
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
                         
                         <a href="#" onclick="increment(${id})" class="add-cart-btn">Añadir a favoritos <i class="bi bi-heart" id="btnh1"></i></a>
                         <a href="#" class="add-wish" id="shareBtn">Compartir <i class="bi bi-share"></i></a>
                         
                       </div>
                     </div>
                   </div>
                 </div>
   
   
   
           
           
           
           <div class="price-quantity">
             
                 
             
   
   
             <div class="buttons">
             <h4>${name}</h4>
             
               <i onclick="decrement(${id})" class=""></i>
               <div id=${id} class="quantity">${
           search.item === undefined ? 0 : search.item
         }</div>
   
         
   
   
   
         
               <i onclick="increment(${id})" class="bi bi-heart" id="btnh1"></i>
             </div>
           </div>
         </div>
         <h5 class="product-name">${name.toUpperCase()}</h5>
     </div>

     </div>
       `;


     


    return resultado





        
    })
    .join(""));
};

generateShop();






var popupViews = document.querySelectorAll('.popup-view');
var popupBtns = document.querySelectorAll('.popup-btn');
var closeBtns = document.querySelectorAll('.close-btn');


var shareBtn = document.querySelectorAll('#shareBtn');
// const title = window.document.title;
var url = window.document.location.href;
var compartir = function share(){
// Check for Web Share api support
if (navigator.share) {
// Browser supports native share api
navigator.share({

imagen:`${shopItemsData.img}`, 
text: `Echale un vistazo a este coctel: ${shopItemsData.id} ${shopItemsData.name}`,
//title:`${shopItemsData.id}`,
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
closeBtns.forEach((closeBtn) =>  {

  
  closeBtn.addEventListener("click", () => {
    //if(e.key==="")
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

  console.log(basket);
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
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};


calculation();


