import { ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { TopMenu } from './top_menu'
import { LeftMenu } from './left_menu'

type AdminLayoutProps = {
  children: ReactNode
  className?: string
}

export const AdminLayout = ({ children, className }: AdminLayoutProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleMenu = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={twMerge('flex min-w-[100vw]')}>
      <TopMenu isExpanded={isExpanded} />
      <LeftMenu isExpanded={isExpanded} toggleMenu={toggleMenu} />
      <div
        className={twMerge(
          'pt-adminTopMenu  min-h-screen max-h-screen overflow-auto ',
          isExpanded ? 'w-adminOpen' : 'w-adminClose',
          'p-6',
          'transition-all duration-300',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
