class Cart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(productId, quantity = 1, storage = null, color = null) {
        const existingItem = this.items.find(item =>
            item.productId === productId &&
            item.storage === storage &&
            item.color === color
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                productId,
                quantity,
                storage,
                color
            });
        }
        this.saveCart();
    }

    removeItem(productId, storage, color) {
        this.items = this.items.filter(item =>
            !(item.productId === productId && item.storage === storage && item.color === color)
        );
        this.saveCart();
    }

    updateQuantity(productId, storage, color, quantity) {
        const item = this.items.find(item =>
            item.productId === productId &&
            item.storage === storage &&
            item.color === color
        );
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId, storage, color);
            } else {
                this.saveCart();
            }
        }
    }

    getTotalPrice(productManager) {
        return this.items.reduce((total, item) => {
            const product = productManager.getProductById(item.productId);
            if (product) {
                const price = product.getPrice(item.storage);
                return total + (price * item.quantity);
            }
            return total;
        }, 0);
    }

    getItems() {
        return this.items;
    }

    clear() {
        this.items = [];
        this.saveCart();
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(el => {
            if (el) el.textContent = count;
        });
    }

    renderCartItem(item, productManager) {
        const product = productManager.getProductById(item.productId);
        if (!product) return '';

        const itemImage = product.getImage(item.color);
        const totalPrice = product.getPrice(item.storage) * item.quantity;
        return `
            <div class="bg-white rounded-lg p-6 flex items-center justify-between border border-[#D2D2D7]">
                <div class="flex items-center space-x-6 flex-1">
                    <div class="w-24 h-24 bg-[#F5F5F7] rounded-lg flex items-center justify-center overflow-hidden border border-[#D2D2D7]">
                        <img src="${itemImage}" alt="${product.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold mb-2 text-[#1D1D1F]">${product.name}</h3>
                        ${item.storage ? `<p class="text-[#6E6E73] mb-1">ความจุ: ${item.storage}</p>` : ''}
                        ${item.color ? `<p class="text-[#6E6E73] mb-1">สี: ${item.color}</p>` : ''}
                        <p class="text-lg font-semibold text-[#1D1D1F]">${product.getFormattedPrice(item.storage)} x ${item.quantity}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <button class="decrease-btn px-4 py-2 bg-[#F5F5F7] rounded-lg hover:bg-[#D2D2D7] transition text-[#1D1D1F] border border-[#D2D2D7]" 
                        data-product-id="${item.productId}" 
                        data-storage="${item.storage || ''}" 
                        data-color="${item.color || ''}">-</button>
                    <span class="text-lg text-[#1D1D1F]">${item.quantity}</span>
                    <button class="increase-btn px-4 py-2 bg-[#F5F5F7] rounded-lg hover:bg-[#D2D2D7] transition text-[#1D1D1F] border border-[#D2D2D7]" 
                        data-product-id="${item.productId}" 
                        data-storage="${item.storage || ''}" 
                        data-color="${item.color || ''}">+</button>
                    <button class="remove-btn ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-white" 
                        data-product-id="${item.productId}" 
                        data-storage="${item.storage || ''}" 
                        data-color="${item.color || ''}">ลบ</button>
                </div>
            </div>
        `;
    }
}
