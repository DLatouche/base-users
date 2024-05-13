import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { AppLayout } from '@/components/layouts/app_layout'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })

      const currentPage = pages[`../pages/${name}.tsx`]
      // @ts-expect-error - Page not typed
      currentPage.default.layout =
        // @ts-expect-error - Page not typed
        currentPage.default.layout || ((pge: ReactNode) => <AppLayout children={pge} />)
      return currentPage
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
