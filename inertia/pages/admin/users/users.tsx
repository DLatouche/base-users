import User from '#models/user'
import { GenericTable } from '@/components/generic_table/generic_table'
import { Column, Order } from '@/components/generic_table/generic_table_type'
import { AdminLayout } from '@/components/layouts/admin_layout/admin_layout'
import { Button } from '@/components/ui/button'
import { debounce } from '@/utils/debounce'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { router, usePage } from '@inertiajs/react'
import { Pencil, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

type UsersProps = {
  usersPaginated: {
    data: User[]
    meta: {
      firstPage: number
      perPage: number
      currentPage: number
      lastPage: number
      hasPages: boolean
      hasMorePages: boolean
      isEmpty: boolean
      total: number
      hasTotal: boolean
    }
  }
}

const Users = () => {
  const { usersPaginated } = usePage<UsersProps>().props

  const [orderBy, setOrderBy] = useState<keyof User>('id')
  const [order, setOrder] = useState<Order>('asc')

  const onChangePage = (currentPage: number) => {
    router.visit('/admin/users', {
      method: 'get',
      data: {
        page: currentPage,
        perPage: usersPaginated.meta.perPage,
        searchQuery: '',
        orderBy,
        order,
      },
      preserveState: true,
      preserveScroll: true,
    })
  }
  const onChangeRowsPerPage = (currentRowsPerPage: number) => {
    router.visit('/admin/users', {
      method: 'get',
      data: { perPage: currentRowsPerPage, page: 1, searchQuery: '', orderBy, order },
      preserveState: true,
      preserveScroll: true,
    })
  }

  const handleSort = (currentSortBy: keyof User, currentSortOrder: Order) => {
    setOrderBy(currentSortBy)
    setOrder(currentSortOrder)
    router.visit('/admin/users', {
      method: 'get',
      data: {
        page: 1,
        perPage: usersPaginated.meta.perPage,
        orderBy: currentSortBy,
        order: currentSortOrder,
        searchQuery: '',
      },
      preserveState: true,
      preserveScroll: true,
    })
  }

  const columns = useMemo<Column<User>[]>(() => {
    return [
      { id: 'id', label: 'ID', maxWidth: '90px', sortable: true },
      { id: 'email', label: 'Email', sortable: true },
      { id: 'username', label: 'Username', sortable: true },
      {
        id: 'emailVerified',
        label: 'Verified',
        sortable: true,
        align: 'right',
        maxWidth: '90px',
        format: (value: boolean) => (
          <span className="flex justify-end">{value ? 'Yes' : 'No'}</span>
        ),
      },
      {
        id: 'updatedAt',
        label: 'updated At',
        format: (value: string) => new Date(value).toLocaleDateString(),
      },
    ]
  }, [])
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-2xl font-semibold mb-4">Tableau de bord</h1>

        <GenericTable<User>
          className="border rounded-md mt-4"
          data={usersPaginated.data}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onSort={handleSort}
          orderBy={orderBy}
          order={order}
          rowKey="id"
          onClickRow={(row) => console.log(row)}
          total={usersPaginated.meta.total}
          page={usersPaginated.meta.currentPage}
          rowsPerPage={usersPaginated.meta.perPage ?? 0}
          columns={columns}
        />
      </div>
    </AdminLayout>
  )
}

export default Users
