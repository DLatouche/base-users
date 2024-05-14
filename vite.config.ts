import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.tsx' } }),
    react(),
    adonisjs({ entrypoints: ['inertia/app/app.tsx'], reload: ['resources/views/**/*.edge'] }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
      '@/components/': `${getDirname(import.meta.url)}/inertia/components/`,
      '@/components/ui': `${getDirname(import.meta.url)}/inertia/components/ui`,
      '@/utils/': `${getDirname(import.meta.url)}/inertia/utils/`,
      '@/hooks/': `${getDirname(import.meta.url)}/inertia/hooks/`,
    },
  },
})
