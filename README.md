# Multer Deta Drive Storage Engine

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
