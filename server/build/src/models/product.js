class Product {
    constructor(info) {
        this.num = null;
        this.tags = null;
        this.cover = null;
        this.address = null;
        this.view = null;
        this.type = null;
        this.id = null;
        this.title = null;
        this.content = null;
        this.capacity = null;
        this.start = null;
        this.end = null;
        this.until = null;
        this.regdate = null;
        this.updates = null;
        Object.keys(info).forEach((key) => {
            this[key] = info[key];
        });
    }
}
export default Product;
