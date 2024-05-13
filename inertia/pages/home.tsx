import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className="container">
        <Button
          onClick={() => {
            setCount((count) => count + 1)
          }}
        >
          Count: {count}
        </Button>
      </div>
    </>
  )
}
