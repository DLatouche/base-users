/// <reference path="../../adonisrc.ts" />

import '../css/app.css'
import '../css/themes.css'
import '../css/scrollbar.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { AppLayout } from '@/components/layouts/app_layout'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: async (name) => {
    const page = await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    )
    // @ts-expect-error - Page not typed
    page.default.layout = page.default.layout || ((pge: ReactNode) => <AppLayout children={pge} />)
    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
