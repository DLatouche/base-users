/**
 * GenericTable component
 * Component for rendering a table with a generic structure
 * Can order, paginate, custom action
 */

import { twMerge } from 'tailwind-merge'
import { GenericTableProps } from './generic_table_type'
import { GenericTablePagination } from './generic_table_pagination'
import { Table } from '../ui/table'
import { GenericTableHeader } from './generic_table_header'
import { GenericTableBody } from './generic_table_body'

export function GenericTable<T>({
  className,
  columns,
  data,
  ActionsComponent,
  onClickRow,
  onSort,
  rowKey,
  orderBy,
  order,
  total,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}: GenericTableProps<T>) {
  const handleSort = (columnId: keyof T) => {
    if (onSort && columnId === orderBy) {
      const newOrder = order === 'asc' ? 'desc' : 'asc'
      onSort(columnId, newOrder)
    } else {
      onSort && onSort(columnId, 'asc')
    }
  }
  const emptyRows = Math.max(0, page * rowsPerPage - total)

  return (
    <div className={twMerge('', className)}>
      <Table>
        <GenericTableHeader<T>
          order={order}
          orderBy={orderBy}
          columns={columns}
          handleSort={handleSort}
          hasActions={!!ActionsComponent}
        />
        <GenericTableBody<T>
          data={data}
          ActionsComponent={ActionsComponent}
          columns={columns}
          emptyRows={emptyRows}
          onClickRow={onClickRow}
          rowKey={rowKey}
        />
      </Table>
      <GenericTablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        rowsPerPage={rowsPerPage}
        total={total}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </div>
  )
}
