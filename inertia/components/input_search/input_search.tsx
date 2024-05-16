import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CircleX } from 'lucide-react'
import { debounce } from '@/utils/debounce'
import { useCallback, useEffect, useState } from 'react'

type InputSearchProps = {
  initialValue?: string
  placeholder?: string
  onSearch: (value: string) => void
  debounceDelay?: number
}

export const InputSearch = ({
  initialValue = '',
  placeholder = 'Search...',
  onSearch,
  debounceDelay = 400,
}: InputSearchProps) => {
  const [tempSearchValue, setTempSearchValue] = useState(initialValue)

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value)
    }, debounceDelay),
    [debounceDelay, onSearch]
  )

  useEffect(() => {
    return () => debouncedSearch.cancel()
  }, [debouncedSearch])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchValue(event.target.value)
    debouncedSearch(event.target.value)
  }

  const handleClearSearch = () => {
    setTempSearchValue('')
    debouncedSearch.cancel()
    onSearch('')
  }

  return (
    <div className="flex items-center">
      <Input
        value={tempSearchValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="max-w-[300px]"
      />
      {tempSearchValue && (
        <Button
          variant="ghost"
          className="rounded-full px-1 py-1 inline-flex items-center justify-center size-10 ml-2"
          onClick={handleClearSearch}
        >
          <CircleX className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
