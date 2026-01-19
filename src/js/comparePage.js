const productManager = new ProductManager();
const compare = new Compare();
const modal = new Modal();

function renderCompare() {
    const compareTable = document.getElementById('compareTable');
    const items = compare.getItems();

    if (items.length === 0) {
        compareTable.innerHTML = '<p class="text-center text-[#6E6E73] py-12">ยังไม่มีสินค้าในรายการเปรียบเทียบ</p>';
        return;
    }

    const products = items.map(id => productManager.getProductById(parseInt(id))).filter(p => p !== undefined);
    
    if (products.length === 0) {
        compareTable.innerHTML = '<p class="text-center text-[#6E6E73] py-12">ยังไม่มีสินค้าในรายการเปรียบเทียบ</p>';
        return;
    }

    const specs = ['หน้าจอ', 'ชิป', 'กล้อง', 'แบตเตอรี่', 'น้ำหนัก'];
    
    let html = '<table class="w-full border-collapse">';
    
    html += '<thead><tr class="border-b border-[#D2D2D7]">';
    html += '<th class="p-4 text-left text-[#1D1D1F] font-semibold">รายละเอียด</th>';
    products.forEach(product => {
        html += `<th class="p-4 text-center text-[#1D1D1F] font-semibold">
            <div class="flex flex-col items-center">
                <div class="w-32 h-32 bg-[#F5F5F7] rounded-lg mb-4 overflow-hidden border border-[#D2D2D7]">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                </div>
                <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                <p class="text-[#6E6E73] mb-2">${product.description}</p>
                <p class="text-2xl font-bold mb-4">${product.getFormattedPrice()}</p>
                <div class="flex flex-col space-y-2 w-full">
                    <a href="product.html?id=${product.id}" class="w-full bg-[#0071E3] hover:bg-[#005BB5] text-white px-4 py-2 rounded-lg transition text-center">
                        ซื้อ
                    </a>
                    <button class="remove-compare-btn w-full px-4 py-2 border border-[#D2D2D7] rounded-lg hover:border-[#0071E3] transition text-[#1D1D1F]" data-product-id="${product.id}">
                        <i class="fas fa-times"></i> ลบ
                    </button>
                </div>
            </div>
        </th>`;
    });
    html += '</tr></thead>';
    
    html += '<tbody>';
    specs.forEach(spec => {
        html += '<tr class="border-b border-[#D2D2D7]">';
        html += `<td class="p-4 font-semibold text-[#1D1D1F]">${spec}</td>`;
        products.forEach(product => {
            const value = product.specs[spec] || '-';
            html += `<td class="p-4 text-center text-[#6E6E73]">${value}</td>`;
        });
        html += '</tr>';
    });
    
    html += '<tr class="border-b border-[#D2D2D7]">';
    html += '<td class="p-4 font-semibold text-[#1D1D1F]">ความจุ</td>';
    products.forEach(product => {
        html += `<td class="p-4 text-center text-[#6E6E73]">${product.storage.join(', ')}</td>`;
    });
    html += '</tr>';
    
    html += '<tr class="border-b border-[#D2D2D7]">';
    html += '<td class="p-4 font-semibold text-[#1D1D1F]">สี</td>';
    products.forEach(product => {
        html += `<td class="p-4 text-center text-[#6E6E73]">${product.color.join(', ')}</td>`;
    });
    html += '</tr>';
    
    html += '<tr>';
    html += '<td class="p-4 font-semibold text-[#1D1D1F]">ราคา (256GB)</td>';
    products.forEach(product => {
        const price256 = product.getPrice('256GB') || product.getPrice('128GB') || product.basePrice;
        html += `<td class="p-4 text-center text-[#1D1D1F] font-bold">฿${price256.toLocaleString('th-TH')}</td>`;
    });
    html += '</tr>';
    
    html += '</tbody></table>';
    
    compareTable.innerHTML = html;
    
    document.querySelectorAll('.remove-compare-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            compare.removeItem(productId);
            renderCompare();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    compare.updateCompareCount();
    renderCompare();
    
    const clearCompareBtn = document.getElementById('clearCompareBtn');
    if (clearCompareBtn) {
        clearCompareBtn.addEventListener('click', () => {
            compare.clear();
            renderCompare();
        });
    }
});

