class Modal {
    constructor() {
        this.modalElement = null;
        this.init();
    }

    init() {
        if (!document.getElementById('appModal')) {
            const modalHTML = `
                <div id="appModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 border border-[#D2D2D7] shadow-2xl">
                        <div class="text-center">
                            <div class="mb-6">
                                <i class="fas fa-check-circle text-[#0071E3] text-5xl mb-4"></i>
                            </div>
                            <h3 id="modalTitle" class="text-2xl font-semibold mb-4 text-[#1D1D1F]"></h3>
                            <p id="modalMessage" class="text-[#6E6E73] mb-8 text-lg"></p>
                            <button id="modalCloseBtn" class="w-full bg-[#0071E3] hover:bg-[#005BB5] text-white py-3 rounded-lg text-lg font-semibold transition">
                                ตกลง
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.modalElement = document.getElementById('appModal');
            const closeBtn = document.getElementById('modalCloseBtn');
            closeBtn.addEventListener('click', () => this.hide());
            this.modalElement.addEventListener('click', (e) => {
                if (e.target === this.modalElement) {
                    this.hide();
                }
            });
        } else {
            this.modalElement = document.getElementById('appModal');
        }
    }

    show(title, message, type = 'success') {
        const titleEl = document.getElementById('modalTitle');
        const messageEl = document.getElementById('modalMessage');
        const iconEl = this.modalElement.querySelector('i');

        titleEl.textContent = title;
        messageEl.textContent = message;

        if (type === 'success') {
            iconEl.className = 'fas fa-check-circle text-[#0071E3] text-5xl mb-4';
        } else if (type === 'error') {
            iconEl.className = 'fas fa-exclamation-circle text-red-500 text-5xl mb-4';
        } else if (type === 'warning') {
            iconEl.className = 'fas fa-exclamation-triangle text-yellow-500 text-5xl mb-4';
        }

        this.modalElement.classList.remove('hidden');
        this.modalElement.classList.add('flex');
    }

    hide() {
        this.modalElement.classList.add('hidden');
        this.modalElement.classList.remove('flex');
    }
}

