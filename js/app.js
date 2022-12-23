let product_div = document.querySelector("#products");
let top_cart_div = document.querySelector("#totaltopcart");
let carts_div = document.querySelector(".carts");

const products = JSON.parse(localStorage.getItem("products") || "[]");
let likes = JSON.parse(localStorage.getItem("likes")) || [];

let carts = JSON.parse(localStorage.getItem("carts") || "[]");

//show all products
showProducts();

function showProducts() {
  let tr = "";
  for (let product of products) {
    tr += `
    <div class="product">
        <div class="product_img">
        <div class="p_img_box">
            <img src=${product.thumbnail}  />
        </div>
        </div>
        <div class="content_text">
        <div class='product_info'>
            <p>${product.title}</p>
            <div class="product_star">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
            </div>
            <p> $ ${product.price}</p>
        </div>

        <div class="product_buttons">
            <button class="btns" id='like_btn' onclick="addToLike(${product.id})">
              <ion-icon name="heart" class='like_icon' style='color:#fff;'></ion-icon>
              <span>Like</span>
            </button>
            <button class="btns" onclick="addToCart(${product.id})">
              <ion-icon name="cart-outline"></ion-icon>
              <span>Add</span>
            </button>
        </div>
        </div>
  </div>`;
  }

  product_div.innerHTML = tr;

  updateCart();
  updateLike();
}

// like cart
let all_like_btn = document.querySelectorAll(".like_icon");

function addToLike(idOfLiked) {
  let isLiked = false;

  if (likes.some((item) => item.id === idOfLiked)) {
    deleteLike(idOfLiked);
  } else {
    isLiked = true;
    let likeItem = products.find((item) => item.id === idOfLiked);

    likes.push(likeItem);

    localStorage.setItem("likes", JSON.stringify(likes));
  }

  if (isLiked === true) {
    all_like_btn[idOfLiked - 1].removeAttribute("style");
  } else {
    all_like_btn[idOfLiked - 1].setAttribute("style", "color:#fff;");
  }

  updateLike();
}

function updateLike() {
  countLike();
}

function countLike() {
  let countOfLike = 0;

  countOfLike = likes.length;
  document.getElementById("like_count").innerHTML = countOfLike;
}

//delete like

function deleteLike(id) {
  isLiked = false;
  likes = likes.filter((item) => item.id !== id);

  localStorage.setItem("likes", JSON.stringify(likes));

  updateLike();
}

// add to top cart

function addToCart(id) {
  // console.log(id);

  if (carts.some((p) => p.id === id)) {
    numberOfCountFunc("plus", id);
  } else {
    let cartItem = products.find((item) => item.id === id);
    carts.push({
      ...cartItem,
      numberOfCount: 1,
    });
  }

  let div = document.createElement("div");
  div.innerHTML = "Mahsulot savatchaga qo'shildi";
  div.classList.add("added_warning");

  document.querySelector(".container").appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 1500);
  localStorage.setItem("carts", JSON.stringify(carts));
  updateCart();
}

// update cart

function updateCart() {
  showCart();
  calculateItem();
}
// calculate item
function calculateItem() {
  let totalCount = 0;
  let totalAmount = 0;
  carts.forEach((item) => {
    totalAmount += item.price * item.numberOfCount;
    totalCount = carts.length;
  });

  document.querySelector(".amount_added").innerHTML =
    "$" + totalAmount.toFixed(2);
  document.querySelector("#cart_count").innerHTML = totalCount;
}

//show top cart items only three items

function showCart() {
  let item = "";
  let len = carts.length;
  let onlyThree = carts?.slice(0, 3);

  if (len !== 0) {
    onlyThree?.map((cart) => {
      item += `
      <div class="top_cart">
      <div class="top_cart_info">
      <div class="top_imgcat">
      <img src=${cart.thumbnail}
              width="50px"
              alt=${cart.category}
              />
              </div>
              <div class="top_carttext">
              <h4>${cart.category} (x${cart.numberOfCount})</h4>
              </div>
              </div>

              <div class="top_cartamount">
              <div class="topcartmoney">$${cart.price}</div>
              <div class="top_deletecart">
                <ion-icon name="trash-outline" onclick="deleteTopItem(${cart.id})"></ion-icon>
              </div>
              </div>
              </div>
              `;
    });
    top_cart_div.innerHTML = item;
  } else {
    top_cart_div.innerHTML = "Savatchada mahsulot yo'q!";
  }
}

function deleteTopItem(id) {
  carts = carts.filter((item) => item.id !== id);

  localStorage.setItem("carts", JSON.stringify(carts));

  updateCart();
}

// increment an item

function numberOfCountFunc(action, id) {
  carts = carts.map((item) => {
    let numberOfCount = item.numberOfCount;

    if (item.id === id) {
      if (action === "plus") {
        numberOfCount++;
      } else if (action === "minus" && numberOfCount > 1) {
        numberOfCount--;
      }
    }

    return {
      ...item,
      numberOfCount,
    };
  });

  localStorage.setItem("carts", JSON.stringify(carts));

  updateCart();
}
