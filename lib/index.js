"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MulterDetaStorage_instances, _MulterDetaStorage_drive, _MulterDetaStorage_getProperName;
Object.defineProperty(exports, "__esModule", { value: true });
const deta_1 = require("deta");
const nanoid_1 = require("nanoid");
class MulterDetaStorage {
    constructor(config) {
        _MulterDetaStorage_instances.add(this);
        _MulterDetaStorage_drive.set(this, void 0);
        __classPrivateFieldSet(this, _MulterDetaStorage_drive, (0, deta_1.Deta)(config.projectKey).Drive(config.baseName), "f");
    }
    _handleFile(req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileBuf = yield stream2buffer(file.stream);
                const res = yield __classPrivateFieldGet(this, _MulterDetaStorage_drive, "f").put(__classPrivateFieldGet(this, _MulterDetaStorage_instances, "m", _MulterDetaStorage_getProperName).call(this, file.originalname), {
                    data: fileBuf,
                    contentType: file.mimetype,
                });
                cb(null, {
                    path: res,
                    size: fileBuf.length,
                });
            }
            catch (er) {
                cb(er);
            }
        });
    }
    _removeFile(req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield __classPrivateFieldGet(this, _MulterDetaStorage_drive, "f").delete(file.path);
                cb(null, {
                    path: res,
                });
            }
            catch (er) {
                cb(er);
            }
        });
    }
}
_MulterDetaStorage_drive = new WeakMap(), _MulterDetaStorage_instances = new WeakSet(), _MulterDetaStorage_getProperName = function _MulterDetaStorage_getProperName(fileName) {
    const nameParts = fileName.split(".");
    const ext = nameParts[nameParts.length - 1];
    const name = nameParts.slice(0, nameParts.length - 1).join(".");
    return name + "." + (0, nanoid_1.nanoid)() + "." + ext;
};
function stream2buffer(stream) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const _buf = Array();
            stream.on("data", (chunk) => _buf.push(chunk));
            stream.on("end", () => resolve(Buffer.concat(_buf)));
            stream.on("error", (err) => reject(`error converting stream - ${err}`));
        });
    });
}
exports.default = (opts) => {
    return new MulterDetaStorage(opts);
};
//# sourceMappingURL=index.js.map