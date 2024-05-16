import { useToast } from '@/components/ui/use-toast'
import { useEffect } from 'react'

export const useSuccess = (props: any, key: string, defaultMessage?: string) => {
  const { toast } = useToast()

  useEffect(() => {
    const success = props.success
    if (success)
      console.log(
        '%cuse_success.tsx (11) -> sucesss',
        'background: #cddc39; color:#212121',
        success
      )
    if (success && success[key]) {
      toast({
        description: defaultMessage || "Tout s'est bien passé.",
      })
    }
  }, [props.success])
}
