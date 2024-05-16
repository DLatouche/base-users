export type Order = 'asc' | 'desc'

export interface GenericTableProps<T> {
  columns: Column<T>[]
  data: T[]
  rowKey: keyof T // key for identifying each row
  className?: string

  // Actions
  ActionsComponent?: React.ComponentType<{ item: T }>
  onClickRow?: (item: T) => void

  // Sorting
  onSort?: (sortBy: keyof T, sortOrder: Order) => void
  orderBy: keyof T
  order: Order

  // Pagination
  total: number
  page: number
  rowsPerPage: number
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (rowsPerPage: number) => void
}

export interface Column<T> {
  id: keyof T
  label: string // Name of the column
  align?: 'left' | 'center' | 'right'
  format?: (value: any, record: T) => React.ReactNode
  minWidth?: string
  maxWidth?: string
  sortable?: boolean
}

export type GenericTablePaginationProps = {
  rowsPerPageOptions: number[]
  rowsPerPage: number
  total: number
  page: number
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (rowsPerPage: number) => void
}

export type GenericTableHeaderProps<T> = {
  columns: Column<T>[]
  handleSort: (columnId: keyof T) => void
  orderBy: keyof T
  order: Order
  hasActions: boolean
}

export type GenericTableBodyProps<T> = {
  data: T[]
  ActionsComponent?: React.ComponentType<{ item: T }>
  columns: Column<T>[]
  emptyRows: number
  onClickRow?: (item: T) => void
  rowKey: keyof T
}
