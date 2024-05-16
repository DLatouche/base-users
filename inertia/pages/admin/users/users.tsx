import type User from '#models/user'
import { Meta, Order } from '@/components/generic_table/generic_table_type'
import { InputSearch } from '@/components/input_search/input_search'
import { AdminLayout } from '@/components/layouts/admin_layout/admin_layout'
import { Button } from '@/components/ui/button'
import UsersTable from '@/components/users/users_table'
import { debounce } from '@/utils/debounce'
import { router, usePage } from '@inertiajs/react'
import { useCallback, useEffect, useState } from 'react'

type UsersProps = {
  usersPaginated: {
    data: User[]
    meta: Meta
  }
}

const Users = () => {
  const pageData = usePage<UsersProps>()
  const {
    props: { usersPaginated },
    url,
  } = pageData

  const urlParams = new URLSearchParams(url)
  const initialSearchQuery = urlParams.get('searchQuery') || ''
  const initialOrderBy = (urlParams.get('orderBy') as keyof User) || 'id'
  const initialOrder = (urlParams.get('order') as Order) || 'asc'

  const [searchedValue, setSearchValue] = useState(initialSearchQuery)
  const [orderBy, setOrderBy] = useState<keyof User>(initialOrderBy)
  const [order, setOrder] = useState<Order>(initialOrder)

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

  const handleSearch = useCallback(
    (value: string) => {
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
    },
    [usersPaginated.meta.perPage]
  )

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

  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-2xl font-semibold mb-4">Tableau de bord</h1>
        <div className="my-4 flex justify-between">
          <InputSearch
            initialValue={searchedValue}
            placeholder="Recherche par email ou pseudo..."
            onSearch={handleSearch}
          />
          <Button
            variant="outline"
            className=""
            onClick={() => {
              router.visit(`/admin/users/create`)
            }}
          >
            Créer un utilisateur
          </Button>
        </div>
        <UsersTable
          usersPaginated={usersPaginated}
          orderBy={orderBy}
          order={order}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onSort={handleSort}
        />
      </div>
    </AdminLayout>
  )
}

export default Users
