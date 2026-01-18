class ProductManager {
    constructor() {
        this.products = [
            new Product('iPhone 17 Pro', 42900, 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-3inch-silver?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RzRIN3Q2Z245Z1F3L1paWlRjZnl6YTF1TmpsTkNoRVRMR1N6UXlVZFBaU0V0cFVnZ3ZFSFRBQ3V3NlRDYUtORXdiekljUkhKWjh1OWFObU5YZDcvaFozZExFRUhtSDlTbWRkOElxTTZhT213&traceId=1', 'ดีไซน์สุดล้ำเพื่อประสิทธิภาพและการใช้งานแบตเตอรี่ที่เหนือชั้น', ['256GB', '512GB', '1TB'], ['เงิน', 'ส้มคอสมิก', 'น้ำเงินเข้ม'],
                { '256GB': 42900, '512GB': 49900, '1TB': 59900 },
                { 'เงิน': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-3inch-silver?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RzRIN3Q2Z245Z1F3L1paWlRjZnl6YTF1TmpsTkNoRVRMR1N6UXlVZFBaU0V0cFVnZ3ZFSFRBQ3V3NlRDYUtORXdiekljUkhKWjh1OWFObU5YZDcvaFozZExFRUhtSDlTbWRkOElxTTZhT213&traceId=1', 'ส้มคอสมิก': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-3inch-cosmicorange?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RUlmWnJkM2NiV2hVVVF2ZE1VdGpQZWhsQTdPYWVGbmdIenAvNE9qYmZVYWVRU0p3cnVrZzhmdWQwTDVYRlMxUFpybkIybk5RZmlyRnNkQjBrajdkK0xkcXJGUGVrU1ArK3Q2aVZMUWhIMWR3&traceId=1', 'น้ำเงินเข้ม': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-3inch-deepblue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RUczK3M0RVhxWWpFZXJsZzlEU0tTSHVHdDcxbVFRSnhaQ0pnV1pOaG5KaGpDNlBJczZRQmxyM2ZhZjVKT0RIMFM2NTdoTE1CSk42L0JxTFpVUzIzdnM0aFZVRm9QUXRmM0IxejNEZlhMaEJR&traceId=1' }
            ),

            new Product('iPhone Air', 38900, 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-select-202509-skyblue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=NUpaQVl1bitSNmJWZUdKdi9QZHhsQnMyOXpiUEVyWXc0UFVFMUg1R1ZtcnR3aXI2UmJNYjhmODd5OGtKRlJRNzVCSW5DdTZTRHgrNTNRdmxjVkxVOW11Y0hhYzFCK0tzV3gwSFNTUHQzNHNTQWxGY2U3RFd3aElOY2g4TXY1dXg&traceId=1', 'iPhone ที่บางที่สุด เท่าที่เคยมีมา อัดแน่น ด้วยขุมพลังระดับโปร', ['128GB', '256GB'], ['สกายบลู', 'ดำสเปซแบล็ค',],
                { '128GB': 38900, '256GB': 43900 },
                { 'สกายบลู': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-select-202509-skyblue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=NUpaQVl1bitSNmJWZUdKdi9QZHhsQnMyOXpiUEVyWXc0UFVFMUg1R1ZtcnR3aXI2UmJNYjhmODd5OGtKRlJRNzVCSW5DdTZTRHgrNTNRdmxjVkxVOW11Y0hhYzFCK0tzV3gwSFNTUHQzNHNTQWxGY2U3RFd3aElOY2g4TXY1dXg&traceId=1', 'ดำสเปซแบล็ค': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-select-202509-spaceblack?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=NUpaQVl1bitSNmJWZUdKdi9QZHhsQnMyOXpiUEVyWXc0UFVFMUg1R1Ztcit0SFUxZzlOYjFnK2g1TG9hVnNYcmd2S3NaRzcrU0dmYjNHTUFiMnlsWGEwekI5ZWpRa0o2WWdVYzdzTUdBdFVINTBqTk5VbWtTMWFmRFpRMGVLeWY&traceId=1' }
            ),

        ];
        this.products.forEach((product, index) => {
            product.id = index + 1;
        });
    }

    getProductById(id) {
        return this.products.find(p => p.id === parseInt(id));
    }

    getAllProducts() {
        return this.products;
    }
}
