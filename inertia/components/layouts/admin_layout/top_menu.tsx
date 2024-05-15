import type { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { UserMenu } from '../menu_layout.tsx/user_menu'
import { BreadcrumbMenu } from './breadcrumb_menu'

type TopMenuProps = ComponentPropsWithoutRef<'div'> & { isExpanded: boolean }

export const TopMenu = ({ isExpanded }: TopMenuProps) => {
  return (
    <div
      className={twMerge(
        'z-10 h-adminTopMenu fixed top-0 right-0  transition-all duration-300',
        isExpanded ? 'w-adminOpen' : 'w-adminClose'
      )}
    >
      <div
        className={twMerge(
          'backdrop-blur-sm	bg-background/90',
          'flex items-center justify-between p-5 mx-4'
        )}
      >
        <BreadcrumbMenu />
        <UserMenu />
      </div>
    </div>
  )
}
