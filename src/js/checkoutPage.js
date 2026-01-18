const productManager = new ProductManager();
const cart = new Cart();
const checkout = new Checkout(cart, productManager);
const modal = new Modal();

document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartCount();

    if (cart.getItems().length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    const summary = checkout.renderOrderSummary();
    const orderSummary = document.getElementById('orderSummary');
    const orderTotal = document.getElementById('orderTotal');

    if (orderSummary) {
        orderSummary.innerHTML = summary.items;
    }
    if (orderTotal) {
        orderTotal.textContent = summary.total;
    }

    const payBtn = document.getElementById('payBtn');
    const checkoutForm = document.getElementById('checkoutForm');

    if (payBtn && checkoutForm) {
        payBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const formData = {
                fullName: document.getElementById('fullName').value || '',
                email: document.getElementById('email').value || '',
                phone: document.getElementById('phone').value || '',
                address: document.getElementById('address').value || ''
            };

            const order = checkout.processOrder(formData);

            modal.show('สั่งซื้อสำเร็จ', `หมายเลขคำสั่งซื้อ: ${order.id}\nยอดรวม: ${summary.total}`, 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
});

