let shop = document.getElementById('shop')

console.log(shop);

// let shopItemData = [{
//   id: "fhhfhf",
//   name: "Casual Shirt",
//   price: 45,
//   desc: "Lorem, ipsum dolor sit amet consectetur adipisicing.",
//   img: "imgaes/shirt1.jpg"
// },

// {
//   id: "fffjjffjjf",
//   name: "Office Shirt",
//   price: 100,
//   desc: "Lorem, ipsum dolor sit amet consectetur adipisicing.",
//   img: "imgaes/shirt2.jpg"
// },

// {
//   id: "hddjfjfj",
//   name: "T Shirt",
//   price: 25,
//   desc: "Lorem, ipsum dolor sit amet consectetur adipisicing.",
//   img: "imgaes/shirt4.jpg"
// },

// {
//   id: "fggg",
//   name: "Men Suit",
//   price: 300,
//   desc: "Lorem, ipsum dolor sit amet consectetur adipisicing.",
//   img: "imgaes/shirt2.jpg"
// }
// ]

let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {
  return (shop.innerHTML = shopItemData.map((x) => {
    let { id, name, price, desc, img } = x
    let search = basket.find((x) => x.id === id) || []
    return `
<div id=product-id-${id} class="item">
  <img src="${img}" alt="">
  <div class="details">
    <h3>${name}</h3>
    <p>${desc}</p>
    <div class="price-quantity">
      <h2>$ ${price}</h2>
      <div class="buttons">
        <i onclick="decrement(${id})" class="bi bi-dash"></i>
        <div id=${id} class="quantity">
        ${search.item === undefined ? 0 : search.item}
        </div>
        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
      </div>
    </div>
  </div>
</div>

`
  }).join(""));
}

generateShop();


let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
  update(selectedItem.id);

  localStorage.setItem("data", JSON.stringify(basket));


};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }


  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);

  localStorage.setItem("data", JSON.stringify(basket));

};


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item
  calculation()
};


let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  // console.log(basket.map((x) => x.item)).reduce(((x, y) => x + y, 0));
  // cartIcon.innerHTML = 100;
  // console.log ("cal is ruuning")
}


calculation();
