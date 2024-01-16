import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_BASE,
    plugins: [react()],
  }
})
