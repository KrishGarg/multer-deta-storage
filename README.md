# Multer Deta Drive Storage Engine

[![version](https://img.shields.io/npm/v/multer-deta-storage?style=for-the-badge)](https://www.npmjs.com/package/multer-deta-storage)
![license](https://img.shields.io/npm/l/multer-deta-storage?style=for-the-badge)
![downloads](https://img.shields.io/npm/dw/multer-deta-storage?style=for-the-badge)

`multer-deta-storage` is a custom storage engine for [multer](https://github.com/expressjs/multer) to support [Deta Drive](https://docs.deta.sh/docs/drive/about).

# Installation

```shell
yarn add multer-deta-storage
```

or

```shell
npm i multer-deta-storage --save
```

# Configuration

| Property   | Required? | Description                                                                                        |
| ---------- | --------- | -------------------------------------------------------------------------------------------------- |
| baseName   | Yes       | What do you want to name the Deta Drive.                                                           |
| projectKey | No        | Project Key for a Deta Project. By default, looks for the `DETA_PROJECT_KEY` environment variable. |

# Usage

```js
const express = require("express");
const multer = require("multer");
const detaStorage = require("multer-deta-storage");

const app = express();
const upload = multer({
  storage: detaStorage({
    baseName: "my-base-name",
    projectKey: "my-project-key",
  }),
});

app.post("/upload", upload.any(), (req, res) => {
  console.log(req.files);
  res.json(req.files);
});
```
