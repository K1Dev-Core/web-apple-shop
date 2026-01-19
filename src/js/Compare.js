class Compare {
    constructor() {
        this.items = this.loadCompare();
    }

    loadCompare() {
        const saved = localStorage.getItem('compare');
        return saved ? JSON.parse(saved) : [];
    }

    saveCompare() {
        localStorage.setItem('compare', JSON.stringify(this.items));
        this.updateCompareCount();
    }

    addItem(productId) {
        if (this.items.length >= 3) {
            return false;
        }
        if (!this.items.includes(productId)) {
            this.items.push(productId);
            this.saveCompare();
            return true;
        }
        return false;
    }

    removeItem(productId) {
        this.items = this.items.filter(id => id !== productId);
        this.saveCompare();
    }

    getItems() {
        return this.items;
    }

    clear() {
        this.items = [];
        this.saveCompare();
    }

    updateCompareCount() {
        const count = this.items.length;
        const compareCountElements = document.querySelectorAll('#compareCount');
        compareCountElements.forEach(el => {
            if (el) el.textContent = count;
        });
    }

    isInCompare(productId) {
        return this.items.includes(productId);
    }
}

