import { Button } from '@/components/ui/button'
import { Head } from '@inertiajs/react'
import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Head title="Homepage" />

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
