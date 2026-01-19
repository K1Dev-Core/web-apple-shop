const productManager = new ProductManager();
const cart = new Cart();
const compare = new Compare();
const modal = new Modal();

document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartCount();
    compare.updateCompareCount();
    
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        const products = productManager.getAllProducts();
        productsGrid.innerHTML = products.map(p => p.renderCard()).join('');
        
        document.querySelectorAll('.compare-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = parseInt(btn.dataset.productId);
                if (compare.isInCompare(productId)) {
                    compare.removeItem(productId);
                    modal.show('ลบออกแล้ว', 'ลบสินค้าออกจากรายการเปรียบเทียบแล้ว', 'success');
                } else {
                    if (compare.addItem(productId)) {
                        modal.show('เพิ่มแล้ว', 'เพิ่มสินค้าเข้าสู่รายการเปรียบเทียบแล้ว', 'success');
                    } else {
                        modal.show('แจ้งเตือน', 'สามารถเปรียบเทียบได้สูงสุด 3 รายการ', 'warning');
                    }
                }
                compare.updateCompareCount();
            });
        });
    }
});

