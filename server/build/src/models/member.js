class Member {
    constructor(info) {
        this.num = null;
        this.cover = null;
        this.name = null;
        this.jumin = null;
        this.id = null;
        this.pw = null;
        this.msg = null;
        this.email = null;
        this.address = null;
        this.zip = null;
        this.gender = null;
        this.interest = null;
        this.regdate = null;
        this.updates = null;
        Object.keys(info).forEach((key) => {
            this[key] = info[key];
        });
    }
}
export default Member;
