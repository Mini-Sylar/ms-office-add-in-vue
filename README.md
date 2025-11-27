# Build Excel/ Any Office Add-Ins with Vue.js and Vite

## Introduction

This is a simple starter template to build Microsoft Add-Ins with Vue.js and Vite.

## Screenshot

[![Screenshot](https://drive.google.com/uc?export=view&id=15d8sKZm38bAdxgus6xwguslZlxVTh8hN)](https://drive.google.com/file/d/15d8sKZm38bAdxgus6xwguslZlxVTh8hN/view?usp=drive_link)

## Features

- `Vue 3.4 💚` + `Vite 7 💜💛` + `TypeScript 💙`
- `Vue Router Hash Mode` 🔗
- [`officeAddin 🔌`](https://github.com/jozefizso/vite-plugin-office-addin/tree/main/src) to generate manifest file at build time
  - See readme for configuration options

## Getting Started (Local Development)

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Office plugins require that the app is served over HTTPS. So you'll have to install a self-signed certificate for local development. Run the following command to install the certificate. See [Securing your app](https://learn.microsoft.com/en-us/office/dev/add-ins/quickstarts/excel-quickstart-vue#secure-the-app):

```bash
npx office-addin-dev-certs install
```

4. Start the development server

```bash
npm run dev
```

5. Sideload the add-in to Excel (Web is much easier). See [Sideload an Office Add-in on Windows](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing)

## Generating Manifest Files for Other Office Products

[Generating Manifest Files](https://learn.microsoft.com/en-us/office/dev/add-ins/quickstarts/excel-quickstart-vue#generate-the-manifest-file)

- Replace the manifest file with your new manifest file

## Build

Coming soon but should be as simple as running `npm run build` and then sideloading the add-in to Excel.
