import { twMerge } from 'tailwind-merge'
import { TableBody, TableCell, TableRow } from '../ui/table'
import { GenericTableBodyProps } from './generic_table_type'

export function GenericTableBody<T>({
  data,
  ActionsComponent,
  columns,
  emptyRows,
  onClickRow,
  rowKey,
}: GenericTableBodyProps<T>) {
  return (
    <TableBody>
      {data.map((item) => (
        <TableRow key={String(item[rowKey])} onClick={() => onClickRow && onClickRow(item)}>
          {columns.map((column) => (
            <TableCell
              key={String(column.id)}
              className={twMerge(`text-${column.align || 'left'}`, 'truncate')}
              style={{
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
              }}
            >
              <>{column.format ? column.format(item[column.id], item) : item[column.id]}</>
            </TableCell>
          ))}
          {ActionsComponent && (
            <TableCell>
              <ActionsComponent item={item} />
            </TableCell>
          )}
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }} className="pointer-events-none">
          <TableCell colSpan={columns.length + (ActionsComponent ? 1 : 0)} />
        </TableRow>
      )}
    </TableBody>
  )
}
