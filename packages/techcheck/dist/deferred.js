"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.internalPromise = new Promise(function (res, rej) {
            _this.resolver = res;
            _this.rejector = rej;
        });
    }
    Object.defineProperty(Deferred.prototype, "promise", {
        get: function () { return this.internalPromise; },
        enumerable: true,
        configurable: true
    });
    Deferred.prototype.resolve = function (value) {
        this.resolver(value);
        return this.promise;
    };
    Deferred.prototype.reject = function (reason) {
        this.rejector(reason);
        return this.promise;
    };
    return Deferred;
}());
exports.Deferred = Deferred;
//# sourceMappingURL=deferred.js.map