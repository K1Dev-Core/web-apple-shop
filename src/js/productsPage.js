const productManager = new ProductManager();
const cart = new Cart();

document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartCount();

    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        const products = productManager.getAllProducts();
        productsGrid.innerHTML = products.map(p => p.renderCard()).join('');
    }
});

