const cuid = require("cuid");

module.exports.Crypto = class Crypto {
    static generate() {
        return cuid();
    }
    static genSubString(length = 8) {
        return cuid().substring(0, length);
    }
};
