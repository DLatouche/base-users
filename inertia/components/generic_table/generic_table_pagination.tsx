import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { GenericTablePaginationProps } from './generic_table_type'

export const GenericTablePagination = ({
  rowsPerPageOptions,
  rowsPerPage,
  total,
  page,
  onChangePage,
  onChangeRowsPerPage,
}: GenericTablePaginationProps) => {
  const handleChangePerPage = (value: string) => {
    onChangeRowsPerPage(Number.parseInt(value))
  }

  const handleNextPage = () => {
    onChangePage(page + 1)
  }

  const handlePrevPage = () => {
    onChangePage(page - 1)
  }

  return (
    <div className="flex items-center justify-end space-x-4 py-2 px-4  border-t text-sm text-muted-foreground ">
      <div className="flex items-center">
        <span className="mr-2">Nombre de lignes par page</span>
        <Select value={rowsPerPage + ''} onValueChange={handleChangePerPage}>
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {rowsPerPageOptions.map((option) => (
              <SelectItem value={option + ''} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <span className="mx-2">
        {' '}
        {(page - 1) * rowsPerPage + 1} - {Math.min((page - 1 + 1) * rowsPerPage, total)} sur {total}
      </span>
      <div className="space-x-2">
        <Button
          variant="ghost"
          className="rounded-full px-1 py-1 inline-flex items-center justify-center size-8"
          disabled={page === 1}
          onClick={handlePrevPage}
        >
          <ChevronLeft className="h-6 w-6 mr-[2px]" />
        </Button>
        <Button
          variant="ghost"
          className="rounded-full px-1 py-1 inline-flex items-center justify-center size-8"
          disabled={page === Math.ceil(total / rowsPerPage)}
          onClick={handleNextPage}
        >
          <ChevronRight className="h-6 w-6 ml-[2px]" />
        </Button>
      </div>
    </div>
  )
}
