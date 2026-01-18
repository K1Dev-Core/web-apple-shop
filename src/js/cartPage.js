const productManager = new ProductManager();
const cart = new Cart();
const checkout = new Checkout(cart, productManager);
const modal = new Modal();

document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartCount();
    renderCart();

    function renderCart() {
        const cartItems = document.getElementById('cartItems');
        const totalPrice = document.getElementById('totalPrice');

        if (cartItems && totalPrice) {
            const items = cart.getItems();

            if (items.length === 0) {
                cartItems.innerHTML = '<p class="text-center text-[#6E6E73] py-12">ตะกร้าของคุณว่างเปล่า</p>';
                totalPrice.textContent = '฿0';
                return;
            }

            cartItems.innerHTML = items.map(item => cart.renderCartItem(item, productManager)).join('');

            const total = cart.getTotalPrice(productManager);
            totalPrice.textContent = `฿${total.toLocaleString('th-TH')}`;

            document.querySelectorAll('.increase-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const productId = parseInt(btn.dataset.productId);
                    const storage = btn.dataset.storage || null;
                    const color = btn.dataset.color || null;
                    const item = cart.items.find(i =>
                        i.productId === productId &&
                        i.storage === storage &&
                        i.color === color
                    );
                    if (item) {
                        cart.updateQuantity(productId, storage, color, item.quantity + 1);
                        renderCart();
                    }
                });
            });

            document.querySelectorAll('.decrease-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const productId = parseInt(btn.dataset.productId);
                    const storage = btn.dataset.storage || null;
                    const color = btn.dataset.color || null;
                    const item = cart.items.find(i =>
                        i.productId === productId &&
                        i.storage === storage &&
                        i.color === color
                    );
                    if (item) {
                        cart.updateQuantity(productId, storage, color, item.quantity - 1);
                        renderCart();
                    }
                });
            });

            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const productId = parseInt(btn.dataset.productId);
                    const storage = btn.dataset.storage || null;
                    const color = btn.dataset.color || null;
                    cart.removeItem(productId, storage, color);
                    renderCart();
                });
            });
        }
    }

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.getItems().length === 0) {
                modal.show('แจ้งเตือน', 'ตะกร้าของคุณว่างเปล่า', 'warning');
                return;
            }
            
            const total = cart.getTotalPrice(productManager);
            const formData = {
                fullName: '',
                email: '',
                phone: '',
                address: ''
            };
            
            const order = checkout.processOrder(formData);
            
            modal.show('สั่งซื้อสำเร็จ', `หมายเลขคำสั่งซื้อ: ${order.id}\nยอดรวม: ฿${total.toLocaleString('th-TH')}`, 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
});

