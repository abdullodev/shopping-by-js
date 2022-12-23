let carts_div = document.querySelector(".carts");
let top_cart_div = document.querySelector("#totaltopcart");

//  cart html page js

let carts = JSON.parse(localStorage.getItem("carts")) || [];
let likes = JSON.parse(localStorage.getItem("likes")) || [];

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

    alert("qoshildi");
    localStorage.setItem("carts", JSON.stringify(carts));
  }
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
  document.querySelector(".total_cart_amount").innerHTML =
    "$" + totalAmount.toFixed(2);
  document.querySelector(".total_cart_count").innerHTML = totalCount;
}

//show top cart items only three items

function showCart() {
  let item = "";
  let len = carts.length;
  let onlyThree = carts.slice(0, 3);

  if (len !== 0) {
    onlyThree.map((cart) => {
      item += `
        <div class="top_cart">
        <div class="top_cart_info">
        <div class="top_imgcat">
        <img src="${cart.thumbnail}"
                width="50px"
                alt="${cart.category}"
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

//  render cart

function renderCart() {
  let item = "";

  if (carts.length !== 0) {
    carts.forEach((cart) => {
      item += `
            <div class="cart_item">
                <div class="cart_img">
                  <div class="c_img_box">
                    <img
                      src=${cart.thumbnail}
                      width="50px"
                      alt=${cart.category}
                    />
                  </div>
                </div>
                <div class="cart_info">
                  <div class='cart_box_title'>
                    <div class="cart_text">
                      <h4>${cart.title}</h4>
                    </div>
    
                    <div class="cart_quantity_box">
                      <ion-icon name="remove-outline" onclick='numberOfCountFunc("minus", ${cart.id})'></ion-icon>
                      <div class="cart_counter">${cart.numberOfCount}</div>
                      <ion-icon name="add-outline"  onclick='numberOfCountFunc("plus", ${cart.id})'></ion-icon>
                    </div>
                  </div>
  
                  <div class="cart_amount">
                    <div class="cart_money">
                      <div class="delete_item_amount">$ ${cart.price}</div>
                    </div>
                    <div class="delete_cart">
                      <div class="delete_icon" onclick='deleteTopItem(${cart.id})'>
                        <ion-icon name="trash-outline"></ion-icon>
                        <span>O'chirish</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
      `;
    });

    carts_div.innerHTML = item;
  } else {
    let div = document.createElement("div");
    div.classList.add("empty_cart");
    let h4 = document.createElement("h4");
    h4.innerHTML = "Savatchada mahsulot yo'q, Iltimos mahsulot tanlang! ";
    h4.classList.add("ampty_text");
    let a = document.createElement("a");
    a.innerHTML = "Back to Home";
    a.setAttribute("href", "index.html");
    a.classList.add("btns");
    a.classList.add("back_home");
    div.appendChild(h4);
    div.appendChild(a);
    carts_div.appendChild(div);
    carts_div.innerHTML = div.innerHTML;
  }

  updateCart();
  updateLike();
}

renderCart();

function numberOfCountFunc(action, id) {
  carts = carts.map((item) => {
    let numberOfCount = item.numberOfCount;

    if (item.id === id) {
      if (action === "plus" && numberOfCount <= item.stock) {
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
  renderCart();
}
// delete top item

function deleteTopItem(id) {
  carts = carts.filter((item) => item.id !== id);

  localStorage.setItem("carts", JSON.stringify(carts));

  updateCart();
  renderCart();
}

// like cart

function addToLike(id) {
  if (likes.some((item) => item.id === id)) {
    alert("Bu mahsulot yoqimlilarga qo'shilgan");
  } else {
    let likeItem = products.find((item) => item.id === id);
    likes.push(likeItem);
    localStorage.setItem("likes", JSON.stringify(likes));
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
