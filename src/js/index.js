fetch('tents.json')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        data.forEach(product => {
            if (product.Id && product.Name && product.Image) {
                const productElement = document.createElement('div');
                productElement.innerHTML = `
          <a href="product_detail.html?product=${product.Id}">
            <img src="${product.Image}" alt="${product.Name}" />
            <h2>${product.Name}</h2>
            <p>$${product.FinalPrice}</p>
          </a>
        `;
                productList.appendChild(productElement);
            }
        });
    });
if (product.FinalPrice < product.SuggestedRetailPrice) {
    productElement.innerHTML += `<span class="discount-badge">Sale</span>`;
}
      