"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnipubError = void 0;
class AnipubError extends Error {
    isAnipubError = true;
    sdk = 'Anipub';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.AnipubError = AnipubError;
//# sourceMappingURL=AnipubError.js.map