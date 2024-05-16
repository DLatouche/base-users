import User from '#models/user'
import { GenericTable } from '@/components/generic_table/generic_table'
import { Column, Order } from '@/components/generic_table/generic_table_type'
import { AdminLayout } from '@/components/layouts/admin_layout/admin_layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { debounce } from '@/utils/debounce'
import { router, usePage } from '@inertiajs/react'
import { CircleX } from 'lucide-react'
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

  const [searchedValue, setSearchValue] = useState('')
  const [tempSearchValue, setTempSearchValue] = useState(searchedValue)

  const [orderBy, setOrderBy] = useState<keyof User>('id')
  const [order, setOrder] = useState<Order>('asc')

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchValue(value)
      router.visit('/admin/users', {
        method: 'get',
        data: {
          page: 1,
          perPage: usersPaginated.meta.perPage,
          orderBy: 'id',
          order: 'asc',
          searchQuery: value,
        },
        preserveState: true,
      })
    }, 400),
    [usersPaginated.meta.perPage]
  )

  useEffect(() => {
    // Cleanup function to cancel any pending debounce actions
    return () => debouncedSearch.cancel()
  }, [debouncedSearch])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchValue(event.target.value)
    debouncedSearch(event.target.value)
  }

  const handleClearSearch = () => {
    setTempSearchValue('')
    debouncedSearch.cancel() // Cancel any debounced calls
    setSearchValue('')
    router.visit('/admin/users', { method: 'get', data: { searchQuery: '' } })
  }

  const onChangePage = (currentPage: number) => {
    router.visit('/admin/users', {
      method: 'get',
      data: {
        page: currentPage,
        perPage: usersPaginated.meta.perPage,
        searchQuery: searchedValue,
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
      data: { perPage: currentRowsPerPage, page: 1, searchQuery: searchedValue, orderBy, order },
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
        searchQuery: searchedValue,
      },
      preserveState: true,
      preserveScroll: true,
    })
  }

  const columns = useMemo<Column<User>[]>(() => {
    return [
      { id: 'id', label: 'ID', maxWidth: '90px', sortable: true },
      { id: 'email', label: 'Email', sortable: true },
      { id: 'username', label: 'Pseudo', sortable: true },
      {
        id: 'emailVerified',
        label: 'Vérfié',
        sortable: true,
        align: 'right',
        maxWidth: '90px',
        format: (value: boolean) => (
          <span className="flex justify-end">{value ? 'Yes' : 'No'}</span>
        ),
      },
      {
        id: 'lastConnexion',
        label: 'Dernière connexion',
        format: (value: string) => {
          return value ? new Date(value).toLocaleDateString() : '-'
        },
      },
    ]
  }, [])

  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-2xl font-semibold mb-4">Tableau de bord</h1>
        <div className="my-4">
          <div className="flex items-center">
            <Input
              value={tempSearchValue}
              onChange={handleInputChange}
              placeholder="Recherche par email ou pseudo..."
              className="max-w-[300px]"
            />
            {tempSearchValue && (
              <Button
                variant="ghost"
                className="rounded-full px-1 py-1 inline-flex items-center justify-center size-10 ml-2 "
                onClick={handleClearSearch}
              >
                <CircleX className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>
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
