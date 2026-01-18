class Checkout {
    constructor(cart, productManager) {
        this.cart = cart;
        this.productManager = productManager;
    }

    renderOrderSummary() {
        const items = this.cart.getItems();
        const total = this.cart.getTotalPrice(this.productManager);

        let html = '';
        items.forEach(item => {
            const product = this.productManager.getProductById(item.productId);
            if (product) {
                const itemPrice = product.getPrice(item.storage);
                html += `
                    <div class="flex justify-between py-2">
                        <div>
                            <p class="font-medium text-[#1D1D1F]">${product.name}</p>
                            ${item.storage ? `<p class="text-sm text-[#6E6E73]">${item.storage}</p>` : ''}
                            ${item.color ? `<p class="text-sm text-[#6E6E73]">${item.color}</p>` : ''}
                            <p class="text-sm text-[#6E6E73]">x${item.quantity}</p>
                        </div>
                        <p class="text-[#1D1D1F]">฿${(itemPrice * item.quantity).toLocaleString('th-TH')}</p>
                    </div>
                `;
            }
        });

        return {
            items: html,
            total: `฿${total.toLocaleString('th-TH')}`
        };
    }

    processOrder(formData) {
        const order = {
            id: Date.now(),
            items: this.cart.getItems(),
            customer: formData,
            total: this.cart.getTotalPrice(this.productManager),
            date: new Date().toISOString()
        };

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        this.cart.clear();

        return order;
    }
}
