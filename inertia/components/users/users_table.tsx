import React, { useCallback, useMemo } from 'react'
import User from '#models/user'
import { GenericTable } from '@/components/generic_table/generic_table'
import { Column, Meta, Order } from '@/components/generic_table/generic_table_type'
import { router } from '@inertiajs/react'

type UsersTableProps = {
  usersPaginated: {
    data: User[]
    meta: Meta
  }
  orderBy: keyof User
  order: Order
  onChangePage: (currentPage: number) => void
  onChangeRowsPerPage: (currentRowsPerPage: number) => void
  onSort: (currentSortBy: keyof User, currentSortOrder: Order) => void
}

const UsersTable: React.FC<UsersTableProps> = ({
  usersPaginated,
  orderBy,
  order,
  onChangePage,
  onChangeRowsPerPage,
  onSort,
}) => {
  const columns = useMemo<Column<User>[]>(() => {
    return [
      { id: 'id', label: 'ID', maxWidth: '90px', sortable: true },
      { id: 'email', label: 'Email', sortable: true },
      { id: 'username', label: 'Pseudo', sortable: true },
      {
        id: 'emailVerified',
        label: 'Vérifié',
        sortable: true,
        align: 'right',
        maxWidth: '90px',
        format: (value: boolean) => (
          <span className="flex justify-end">{value ? 'Yes' : 'No'}</span>
        ),
      },
      {
        sortable: true,
        id: 'lastConnexion',
        label: 'Dernière connexion',
        format: (value: string) => {
          return value ? new Date(value).toLocaleDateString() : '-'
        },
      },
    ]
  }, [])

  return (
    <GenericTable<User>
      className="border rounded-md mt-4"
      data={usersPaginated.data}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      onSort={onSort}
      orderBy={orderBy}
      order={order}
      rowKey="id"
      onClickRow={(row) => console.log(row)}
      total={usersPaginated.meta.total}
      page={usersPaginated.meta.currentPage}
      rowsPerPage={usersPaginated.meta.perPage ?? 0}
      columns={columns}
    />
  )
}

export default UsersTable
