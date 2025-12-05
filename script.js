

// Contact form validation
function sendEmail(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const message = document.getElementById("message").value.trim();

    const nameError = document.getElementById("nameerror");
    const emailError = document.getElementById("emailerror");
    const numberError = document.getElementById("numbererror");

    nameError.textContent = "";
    emailError.textContent = "";
    numberError.textContent = "";

    let isValid = true;

    // Name validation
    if (name === "") {
        nameError.textContent = "Must have a Name";
        nameError.style.color = "red";
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (email === "") {
        emailError.textContent = "Email is Required";
        emailError.style.color = "red";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Invalid Email Format";
        emailError.style.color = "red";
        isValid = false;
    }

    // Number validation
    const numberPattern = /^(\+91[\-\s]?)?[6-9][0-9]{9}$/;
    if (number === "") {
        numberError.textContent = "Number Required";
        numberError.style.color = "red";
        isValid = false;
    } else if (!numberPattern.test(number)) {
        numberError.textContent = "Invalid Number Format";
        numberError.style.color = "red";
        isValid = false;
    }

    if (!isValid) return;

    const data = {
        name: name,
        email: email,
        number: number,
        message: message,
    };

    emailjs
        .send("service_ewuahp2", "template_9al4cbb", data)
        .then((res) => {
            alert("Your message was sent successfully!");
            document.getElementById("form").reset();
        })
        .catch((error) => {
            alert("Failed to send: " + error);
        });
}


// -------------------------------
// ADD TO CART FUNCTION
// -------------------------------
function addToCart(name, price, img) {
  let cart = JSON.parse(sessionStorage.getItem("cartData")) || [];

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      img: img,
      quantity: 1
    });
  }

  sessionStorage.setItem("cartData", JSON.stringify(cart));
  alert("Item added to cart!");
}



// -------------------------------
// LOAD CART WITH IMAGE, QTY BUTTONS, TOTAL
// -------------------------------
function loadCart() {
  const tableBody = document.getElementById("cart-body");
  const grandTotalEl = document.getElementById("grand-total");

  if (!tableBody) return; // Prevents error on non-cart pages

  tableBody.innerHTML = "";
  let cart = JSON.parse(sessionStorage.getItem("cartData")) || [];
  let grandTotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td><img src="${item.img}" width="70" height="70" style="border-radius:8px;"></td>
      <td>${item.name}</td>
      <td>₹${item.price}</td>

      <td>
        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
      </td>

      <td class="item-total">₹${itemTotal}</td>

      <td><button class="remove-btn" onclick="removeItem(${index})">Remove</button></td>
    `;

    tableBody.appendChild(row);
  });

  grandTotalEl.textContent = "₹" + grandTotal;
}



// -------------------------------
// CHANGE QUANTITY (+ / -)
// -------------------------------
function changeQty(index, value) {
  let cart = JSON.parse(sessionStorage.getItem("cartData")) || [];

  cart[index].quantity += value;

  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }

  sessionStorage.setItem("cartData", JSON.stringify(cart));
  loadCart();
}



// -------------------------------
// REMOVE ITEM
// -------------------------------
function removeItem(index) {
  let cart = JSON.parse(sessionStorage.getItem("cartData")) || [];

  cart.splice(index, 1);

  sessionStorage.setItem("cartData", JSON.stringify(cart));
  loadCart();
}



// -------------------------------
// BUY NOW BUTTON
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const buyBtn = document.getElementById("buy-btn");

  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      sessionStorage.removeItem("cartData");
      loadCart();

      const msg = document.getElementById("order-msg");
      msg.style.display = "block";
      msg.textContent = "✔ Order Confirmed!";
    });
  }

  // Auto-load cart on cart.html
  if (document.getElementById("cart-body")) {
    loadCart();
  }
});
