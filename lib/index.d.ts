/// <reference types="express-serve-static-core" />
import multer from "multer";
interface MulterDetaStorageOptions {
    baseName: string;
    projectKey?: string;
}
declare class MulterDetaStorage implements multer.StorageEngine {
    #private;
    constructor(config: MulterDetaStorageOptions);
    _handleFile(req: Express.Request, file: Express.Multer.File, cb: CallableFunction): Promise<void>;
    _removeFile(req: Express.Request, file: Express.Multer.File, cb: CallableFunction): Promise<void>;
}
declare const _default: (opts: MulterDetaStorageOptions) => MulterDetaStorage;
export default _default;
//# sourceMappingURL=index.d.ts.map