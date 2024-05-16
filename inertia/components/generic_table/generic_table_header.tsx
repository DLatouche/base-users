import { ArrowUp } from 'lucide-react'
import { Button } from '../ui/button'
import { TableHead, TableHeader, TableRow } from '../ui/table'
import { twMerge } from 'tailwind-merge'
import { GenericTableHeaderProps } from './generic_table_type'

export function GenericTableHeader<T>({
  columns,
  handleSort,
  orderBy,
  order,
  hasActions,
}: GenericTableHeaderProps<T>) {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((column) => (
          <TableHead
            key={String(column.id)}
            className={twMerge(
              `text-${column.align || 'left'}`,
              column.sortable && 'cursor-pointer'
            )}
            style={{
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
            }}
            onClick={() => column.sortable && handleSort(column.id)}
          >
            {column.sortable ? (
              <span className="inline-flex items-center">
                {column.align === 'right' && (
                  <ArrowUp
                    className={twMerge(
                      'mr-2 h-4 w-4 transition-all',
                      orderBy === column.id ? 'opacity-100' : 'opacity-0',
                      order === 'asc' ? 'rotate-0' : 'rotate-180'
                    )}
                  />
                )}
                <Button className="px-0" variant="link">
                  {column.label}
                </Button>
                {column.align !== 'right' && (
                  <ArrowUp
                    className={twMerge(
                      'ml-2 h-4 w-4 transition-all',
                      orderBy === column.id ? 'opacity-100' : 'opacity-0',
                      order === 'asc' ? 'rotate-0' : 'rotate-180'
                    )}
                  />
                )}
              </span>
            ) : (
              column.label
            )}
          </TableHead>
        ))}
        {hasActions && <TableHead className="text-right">Actions</TableHead>}
      </TableRow>
    </TableHeader>
  )
}
