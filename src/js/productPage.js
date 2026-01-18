const productManager = new ProductManager();
const cart = new Cart();
const modal = new Modal();

let selectedStorage = null;
let selectedColor = null;

document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartCount();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        const product = productManager.getProductById(productId);
        if (product) {
            const productDetail = document.getElementById('productDetail');
            if (productDetail) {
                productDetail.innerHTML = product.renderDetail();

                const storageButtons = document.querySelectorAll('.storage-btn');
                const colorButtons = document.querySelectorAll('.color-btn');

                const productImage = document.getElementById('productImage');
                const productPrice = document.getElementById('productPrice');

                storageButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        storageButtons.forEach(b => {
                            b.classList.remove('border-[#0071E3]', 'bg-[#0071E3]', 'text-white');
                            b.classList.add('border-[#D2D2D7]', 'text-[#1D1D1F]');
                        });
                        btn.classList.remove('border-[#D2D2D7]', 'text-[#1D1D1F]');
                        btn.classList.add('border-[#0071E3]');
                        selectedStorage = btn.dataset.storage;

                        if (productPrice) {
                            productPrice.textContent = product.getFormattedPrice(selectedStorage);
                        }
                    });
                });

                colorButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        colorButtons.forEach(b => {
                            b.classList.remove('border-[#0071E3]', 'bg-[#0071E3]', 'text-white');
                            b.classList.add('border-[#D2D2D7]', 'text-[#1D1D1F]');
                        });
                        btn.classList.remove('border-[#D2D2D7]', 'text-[#1D1D1F]');
                        btn.classList.add('border-[#0071E3]');
                        selectedColor = btn.dataset.color;

                        if (productImage && selectedColor) {
                            const newImage = product.getImage(selectedColor);
                            if (newImage) {
                                productImage.src = newImage;
                            }
                        }
                    });
                });

                const addToCartBtn = document.getElementById('addToCartBtn');
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', () => {
                        cart.addItem(parseInt(productId), 1, selectedStorage, selectedColor);
                        modal.show('สำเร็จ', 'เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว', 'success');
                    });
                }
            }
        }
    }
});

