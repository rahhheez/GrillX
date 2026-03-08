

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
        .send("service_ps6xfvc", "template_9al4cbb", data)
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



// Custom popup replacing alert()
(function () {
  const oldAlert = window.alert;

  window.alert = function (message) {

    let toast = document.createElement("div");
    toast.className = "toast-msg toast-success";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2500);
  };
})();
document.addEventListener("DOMContentLoaded", () => {

  const buyBtn = document.getElementById("buy-btn");

  if (buyBtn) {
    buyBtn.addEventListener("click", function () {

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const number = document.getElementById("number").value.trim();
      const address = document.getElementById("address").value.trim();
      const pincode = document.getElementById("pincode").value.trim();

      const nameError2 = document.getElementById("nameerror2");
      const emailError2 = document.getElementById("emailerror2");
      const numberError2 = document.getElementById("numbererror2");
      const addressError = document.getElementById("addresserror");
      const pincodeError = document.getElementById("pincodeerror");

      nameError2.textContent = "";
      emailError2.textContent = "";
      numberError2.textContent = "";
      addressError.textContent = "";
      pincodeError.textContent = "";

      let isValid = true;

      // Name validation
      if (name === "") {
        nameError2.textContent = "Must have a Name";
        nameError2.style.color = "red";
        isValid = false;
      }

      // Email validation
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

      if (email === "") {
        emailError2.textContent = "Email is Required";
        emailError2.style.color = "red";
        isValid = false;
      } else if (!emailPattern.test(email)) {
        emailError2.textContent = "Invalid Email Format";
        emailError2.style.color = "red";
        isValid = false;
      }

      // Phone validation
      const numberPattern = /^(\+91[\-\s]?)?[6-9][0-9]{9}$/;

      if (number === "") {
        numberError2.textContent = "Number Required";
        numberError2.style.color = "red";
        isValid = false;
      } else if (!numberPattern.test(number)) {
        numberError2.textContent = "Invalid Number Format";
        numberError2.style.color = "red";
        isValid = false;
      }

      // Address validation
      if (address === "") {
        addressError.textContent = "Address Required";
        addressError.style.color = "red";
        isValid = false;
      }

      // Pincode validation
      const pinPattern = /^[0-9]{6}$/;

      if (pincode === "") {
        pincodeError.textContent = "Pincode Required";
        pincodeError.style.color = "red";
        isValid = false;
      } else if (!pinPattern.test(pincode)) {
        pincodeError.textContent = "Invalid Pincode";
        pincodeError.style.color = "red";
        isValid = false;
      }

      // Stop if validation fails
      if (!isValid) return;


      // -------------------------------
      // GET CART DATA
      // -------------------------------

      let cart = JSON.parse(sessionStorage.getItem("cartData")) || [];

      if (cart.length === 0) {
        alert("Cart is empty!");
        return;
      }

      let orderItems = "";
      let total = 0;

      cart.forEach(item => {

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        orderItems += 
`Item: ${item.name}
Quantity: ${item.quantity}
Price: ₹${item.price}
Total: ₹${itemTotal}

`;
      });


      // -------------------------------
      // EMAILJS DATA
      // -------------------------------

      const templateParams = {

        customer_name: name,
        customer_email: email,
        customer_phone: number,
        customer_address: address,
        customer_pincode: pincode,
        order_items: orderItems,
        order_total: "₹" + total

      };


      // -------------------------------
      // SEND EMAIL
      // -------------------------------

      emailjs.send(
        "service_ewuahp2",
        "template_9hd5ovl",
        templateParams
      )
      .then(function () {

        // Clear cart
        sessionStorage.removeItem("cartData");
        loadCart();

        // Success message
        const msg = document.getElementById("order-msg");
        msg.style.display = "block";
        msg.textContent = "✔ Order Confirmed!";

      })
      .catch(function (error) {

        console.log("EmailJS Error:", error);
        alert("Failed to send order");

      });

    });
  }

  // Auto load cart
  if (document.getElementById("cart-body")) {
    loadCart();
  }

});