import type { ReactNode } from 'react'
import { Toaster } from '../ui/toaster'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster />
      <div className="bg-background text-foreground ">
        <main className="min-h-screen">{children}</main>
      </div>
    </>
  )
}
