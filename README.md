# Build Excel/ Any Office Add-Ins with Vue.js and Vite (W.I.P)

## Introduction

This is a simple starter template to build Excel (Manifest can be generated for other office products) Add-Ins with Vue.js and Vite.

## Features

- `Vue 3.4 💚` + `Vite 5 💜💛` + `TypeScript 💙`
- `Custom Hash based routing` 🔗 (Vue Router causes infinite reloads)
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


## Build
Coming soon but should be as simple as running `npm run build` and then sideloading the add-in to Excel.
