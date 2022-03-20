import multer from "multer";
import { Stream } from "stream";
import { Deta } from "deta";
import Drive from "deta/dist/types/drive";
import { nanoid } from "nanoid";

interface MulterDetaStorageOptions {
  baseName: string;
  projectKey?: string;
}

class MulterDetaStorage implements multer.StorageEngine {
  #drive: Drive;

  constructor(config: MulterDetaStorageOptions) {
    if (config.projectKey) {
      this.#drive = Deta(config.projectKey).Drive(config.baseName);
    } else {
      this.#drive = Deta().Drive(config.baseName);
    }
  }

  #getProperName(fileName: string) {
    const nameParts = fileName.split(".");
    const ext = nameParts[nameParts.length - 1];
    const name = nameParts.slice(0, nameParts.length - 1).join(".");
    return name + "." + nanoid() + "." + ext;
  }

  async _handleFile(
    req: Express.Request,
    file: Express.Multer.File,
    cb: CallableFunction
  ) {
    try {
      const fileBuf = await stream2buffer(file.stream);
      const res = await this.#drive.put(
        this.#getProperName(file.originalname),
        {
          data: fileBuf,
          contentType: file.mimetype,
        }
      );
      cb(null, {
        path: res,
        size: fileBuf.length,
      });
    } catch (er) {
      cb(er);
    }
  }

  async _removeFile(
    req: Express.Request,
    file: Express.Multer.File,
    cb: CallableFunction
  ) {
    try {
      const res = await this.#drive.delete(file.path);
      cb(null, {
        path: res,
      });
    } catch (er) {
      cb(er);
    }
  }
}

async function stream2buffer(stream: Stream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();

    stream.on("data", (chunk) => _buf.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(_buf)));
    stream.on("error", (err) => reject(`error converting stream - ${err}`));
  });
}

export = (opts: MulterDetaStorageOptions) => {
  return new MulterDetaStorage(opts);
};
