class Product {
    constructor(name, basePrice, image, description, storage, color, storagePrices = {}, colorImages = {}, id = null) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.image = image;
        this.description = description;
        this.storage = storage;
        this.color = color;
        this.storagePrices = storagePrices;
        this.colorImages = colorImages;
    }

    getPrice(storage = null) {
        if (storage && this.storagePrices[storage]) {
            return this.storagePrices[storage];
        }
        return this.basePrice;
    }

    getImage(color = null) {
        if (color && this.colorImages[color]) {
            return this.colorImages[color];
        }
        return this.image;
    }

    getFormattedPrice(storage = null) {
        const price = this.getPrice(storage);
        return `฿${price.toLocaleString('th-TH')}`;
    }

    renderCard() {
        return `
            <div class="bg-white rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer border border-[#D2D2D7]" onclick="window.location.href='product.html?id=${this.id}'">
                <div class="aspect-square bg-[#F5F5F7] flex items-center justify-center overflow-hidden">
                    <img src="${this.image}" alt="${this.name}" class="w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-semibold mb-2 text-[#1D1D1F]">${this.name}</h3>
                    <p class="text-[#6E6E73] mb-4">${this.description}</p>
                    <p class="text-xl font-semibold mb-4 text-[#1D1D1F]">${this.getFormattedPrice()}</p>
                    <a href="product.html?id=${this.id}" class="inline-block bg-[#0071E3] hover:bg-[#005BB5] text-white px-6 py-2 rounded-lg transition">
                        ซื้อ
                    </a>
                </div>
            </div>
        `;
    }

    renderDetail() {
        return `
            <div>
                <div class="w-full mb-8 overflow-hidden">
                    <div class="w-full aspect-square overflow-hidden">
                        <img id="productImage" src="${this.image}" alt="${this.name}" class="w-full h-full object-cover scale-125">
                    </div>
                </div>
            </div>
            <div>
                <h1 class="text-5xl font-bold mb-4 text-[#1D1D1F]">${this.name}</h1>
                <p class="text-xl text-[#6E6E73] mb-8">${this.description}</p>
                <div class="mb-8">
                    <h3 class="text-lg font-semibold mb-4 text-[#1D1D1F]">ความจุ</h3>
                    <div class="flex space-x-4">
                        ${this.storage.map(s => `<button class="storage-btn px-6 py-3 border border-[#D2D2D7] rounded-lg hover:border-[#0071E3] transition text-[#1D1D1F]" data-storage="${s}">${s}</button>`).join('')}
                    </div>
                </div>
                <div class="mb-8">
                    <h3 class="text-lg font-semibold mb-4 text-[#1D1D1F]">สี</h3>
                    <div class="flex space-x-4">
                        ${this.color.map(c => `<button class="color-btn px-6 py-3 border border-[#D2D2D7] rounded-lg hover:border-[#0071E3] transition text-[#1D1D1F]" data-color="${c}">${c}</button>`).join('')}
                    </div>
                </div>
                <div class="mb-8">
                    <p id="productPrice" class="text-3xl font-bold mb-6 text-[#1D1D1F]">${this.getFormattedPrice()}</p>
                    <button id="addToCartBtn" class="w-full bg-[#0071E3] hover:bg-[#005BB5] text-white py-4 rounded-lg text-lg font-semibold transition">
                        เพิ่มลงตะกร้า
                    </button>
                </div>
            </div>
        `;
    }
}
