interface DebouncedFunction extends Function {
  (...args: any[]): void
  cancel: () => void
}

export const debounce = (func: (...args: any[]) => void, wait: number): DebouncedFunction => {
  let timeout: ReturnType<typeof setTimeout>

  const debouncedFunction: DebouncedFunction = function (...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  } as DebouncedFunction

  debouncedFunction.cancel = () => {
    clearTimeout(timeout)
  }

  return debouncedFunction
}
