const bcrypt = require("bcrypt");

module.exports.Hashing = class Hashing {
    static async hash(password) {
        return await bcrypt.hash(password, 8);
    }
};
