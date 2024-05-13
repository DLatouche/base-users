import { MenuLayout } from '@/components/layouts/menu_layout.tsx/menu_layout'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount((count) => count + 1)
  }
  return (
    <MenuLayout>
      <div className="container">
        <Button onClick={handleClick}>Count: {count}</Button>
      </div>
    </MenuLayout>
  )
}
