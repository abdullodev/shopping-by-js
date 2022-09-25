let top_cart_div = document.querySelector("#totaltopcart");
let likes_div = document.querySelector(".like_items");
let like_count = document.querySelector(".cart_count");

let carts = JSON.parse(localStorage.getItem("carts")) || [];
let likes = JSON.parse(localStorage.getItem("likes")) || [];

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

    let div = document.createElement("div");
    div.innerHTML = "Item added";
    div.classList.add("added_warning");

    document.querySelector(".container").appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 2000);
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
  document.querySelector(".cart_count").innerHTML = totalCount;
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

updateCart();

function deleteTopItem(id) {
  carts = carts.filter((item) => item.id !== id);

  localStorage.setItem("carts", JSON.stringify(carts));

  updateCart();
}

// likes show

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

function renderLike() {
  let tr = "";

  if (likes.length !== 0) {
    likes.map((item) => {
      tr += `       
        <div class="like_item">
            <div class="like_img">
              <img src=${item.thumbnail} />
            </div>
            <div class="like_info">
              <div class='like_box'>
                <div class="like_text">
                    <h4>${item.title}</h4>
                </div>

                <div class="like_quantity_box">
                    <h4>$ ${item.price}</h4>
                </div>
              </div>

              <div class="like_cart_amount">
                <button class="btns frist_like_btn" onclick='addToCartFromLike(${item.id})'>
                  <ion-icon name="cart-outline"></ion-icon>
                  <span>Savatchaga Qo'shish</span>
                </button>
                <button class="btns second_like_btn" onclick="deleteLike(${item.id})">
                  <ion-icon name="trash-outline"></ion-icon>
                  <span>O'chirish</span>
                </button>
              </div>
            </div>
          </div>        
        `;
    });

    likes_div.innerHTML = tr;
  } else {
    let div = document.createElement("div");
    div.classList.add("empty_cart");
    let h4 = document.createElement("h4");
    h4.innerHTML = "Sevimlida hozircha mahsulot yo'q";
    h4.classList.add("ampty_text");
    let a = document.createElement("a");
    a.innerHTML = "Back to Home";
    a.setAttribute("href", "index.html");
    a.classList.add("btns");
    a.classList.add("back_home");
    div.appendChild(h4);
    div.appendChild(a);
    likes_div.appendChild(div);

    likes_div.innerHTML = div.innerHTML;
  }

  updateLike();
}

renderLike();

function deleteLike(id) {
  likes = likes.filter((item) => item.id !== id);

  localStorage.setItem("likes", JSON.stringify(likes));

  renderLike();
}

function addToCartFromLike(id) {
  if (carts.some((item) => item.id === id)) {
    numberOfCountFunc("plus", id);
  } else {
    let fromLike = likes.find((item) => item.id === id);

    carts.push({
      ...fromLike,
      numberOfCount: 1,
    });

    localStorage.setItem("carts", JSON.stringify(carts));
  }

  let div = document.createElement("div");
  div.innerHTML = "Mahsulot savatchaga qo'shildi";
  div.classList.add("added_warning");

  document.querySelector(".container").appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 1500);

  updateCart();
}

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
