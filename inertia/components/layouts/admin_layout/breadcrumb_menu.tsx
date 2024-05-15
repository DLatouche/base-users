import { Fragment, useEffect, useState, type ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { usePage } from '@inertiajs/react'
import { isCuid } from '@/utils/string'

type BreadcrumbItem = {
  label: string
  link?: string
}

const knownPaths: Record<string, string> = {
  dashboard: 'Tableau de bord',
  users: 'Utilisateurs',

  edit: 'Modifier',
  create: 'Créer',
}

export const BreadcrumbMenu = () => {
  const { url } = usePage()
  const [breads, setBreads] = useState<BreadcrumbItem[]>([])

  useEffect(() => {
    const pathSegments = url.split('?')[0].split('/').filter(Boolean).slice(1)
    console.log('breadcrumb_menu.tsx (26) ->pathSegments', pathSegments)

    let cumulativePath = '/admin'
    const currentBreads: BreadcrumbItem[] = []

    pathSegments.forEach((segment, index) => {
      if (knownPaths[segment]) {
        cumulativePath += '/' + segment
        currentBreads.push({
          label: knownPaths[segment],
          link: index < pathSegments.length - 1 ? cumulativePath : undefined,
        })
      }
    })

    setBreads(currentBreads)
  }, [url])

  return (
    <div className={twMerge()}>
      <Breadcrumb>
        <BreadcrumbList>
          {breads.map((breadcrumb, index) => (
            <Fragment key={index}>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={breadcrumb.link}>{breadcrumb.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {index < breads.length - 1 && <BreadcrumbSeparator key={index + 'sep'} />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
