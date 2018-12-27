"use strict";

exports.__esModule = true;
class Service {
    async runExecutor(args) {
        const result = await this.execute(args);

        return result;
    }
}
exports.default = Service;