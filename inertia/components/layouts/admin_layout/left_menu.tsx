import { router, usePage } from '@inertiajs/react'
import { ChevronLeft, LayoutDashboard, MenuIcon, Users } from 'lucide-react'
import { type ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type LeftMenuProps = ComponentPropsWithoutRef<'div'> & {
  isExpanded: boolean
  toggleMenu: () => void
}
export const LeftMenu = ({ isExpanded, toggleMenu }: LeftMenuProps) => {
  return (
    <div
      className={twMerge(
        isExpanded ? 'w-adminLeftMenuOpen' : 'w-adminLeftMenuClose',
        'h-screen relative',
        'transition-all duration-300'
      )}
    >
      <ChevronLeft
        className={twMerge(
          'm-[18px] absolute right-[-30px] top-2 z-10 rounded-full backdrop-blur-sm border border-primary-200 border-dashed',
          'text-primary-500 cursor-pointer !transition-transform duration-300', // Modifié ici
          isExpanded ? 'rotate-0 hover:-translate-x-1' : 'rotate-180 hover:translate-x-1 '
        )}
        onClick={toggleMenu}
      />
      <div
        className={twMerge(
          'py-2 border-r w-full border-primary-200 border-dashed overflow-hidden transition-all duration-300 h-full'
        )}
      >
        <div
          className={twMerge(
            'rounded-sm flex items-center cursor-pointer pr-4 mx-1 my-1 mb-4  ',
            'text-secondary-900'
          )}
          onClick={toggleMenu}
        >
          <MenuIcon className="m-[18px] min-w-[24px]" />
          <p className="ml-2 text-lg">Administration</p>
        </div>
        {itemsMenu.map((breadcrumb, index) => (
          <ItemMenu
            key={index}
            Icon={breadcrumb.Icon ?? MenuIcon}
            label={breadcrumb.label}
            link={breadcrumb.link}
          />
        ))}
      </div>
    </div>
  )
}
type ItemMenuProps = {
  Icon: React.ElementType
  label: string
  link?: string
}

const ItemMenu = ({ Icon, label, link }: ItemMenuProps) => {
  const { url } = usePage()

  const isActive = url === link

  const onClickLink = () => {
    if (!link) return
    router.get(link)
  }
  return (
    <div
      className={twMerge(
        'rounded-sm flex items-center cursor-pointer pr-4 mx-1 my-1 max-h-[60px] ',
        isActive ? 'bg-accent' : 'text-secondary-900',
        'hover:bg-primary-500 hover:text-gray-50 transition-all duration-300'
      )}
      onClick={onClickLink}
    >
      <Icon className="m-[18px] min-w-[24px] " />
      <p className="ml-2 truncate">{label}</p>
    </div>
  )
}
export const itemsMenu = [
  {
    Icon: LayoutDashboard,
    label: 'Tableau de bord',
    link: '/admin/dashboard',
  },
  {
    Icon: Users,
    label: 'Utilisateurs',
    link: '/admin/users',
  },
]
