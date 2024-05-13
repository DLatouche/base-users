import type { ReactNode } from 'react'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="bg-background text-foreground ">
        <main className="min-h-screen">{children}</main>
      </div>
    </>
  )
}
