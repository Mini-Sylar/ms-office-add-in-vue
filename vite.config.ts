import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import officeAddin from 'vite-plugin-office-addin'
import fs from 'fs'
import path from 'path'
import os from 'os'

const homedir = os.homedir()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), officeAddin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(`${homedir}/.office-addin-dev-certs/localhost.key`)),
      cert: fs.readFileSync(path.resolve(`${homedir}/.office-addin-dev-certs/localhost.crt`)),
      ca: fs.readFileSync(path.resolve(`${homedir}/.office-addin-dev-certs/ca.crt`))
    }
  }
})
