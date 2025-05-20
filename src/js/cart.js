import {
  getLocalStorage,
  getLocalStorageItemIndex,
  setLocalStorage,
  removeLocalStorageKey,
} from "./utils.mjs";

// Main render function
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalEl = document.getElementById("cart-total");

  // If cart is empty
  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.classList.add("hide");
    removeLocalStorageKey("so-cart");
    return;
  }

  // Cart is not empty
  productList.innerHTML = cartItems.map(cartItemTemplate).join("");

  // Add event listeners to remove buttons
  cartItems.forEach((item) => {
    document
      .getElementById(`remove-${item.Id}`)
      .addEventListener("click", () => removeItem(item.Id));
  });

  // Show cart footer and update total
  cartFooter.classList.remove("hide");
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  cartTotalEl.textContent = total.toFixed(2);
}

// HTML template for a single cart item
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="remove-item" id="remove-${item.Id}" data-id="${item.Id}"><b>X</b></button>
    </li>
  `;
}

// Function to remove an item by ID
function removeItem(itemId) {
  let cartItems = getLocalStorage("so-cart");
  const itemIndex = getLocalStorageItemIndex(cartItems, "Id", itemId);
  if (itemIndex > -1) {
    cartItems.splice(itemIndex, 1);
    if (cartItems.length > 0) {
      setLocalStorage("so-cart", cartItems);
    } else {
      removeLocalStorageKey("so-cart");
    }
    renderCartContents(); // Re-render the cart
  }
}

// Run on page load
renderCartContents();
