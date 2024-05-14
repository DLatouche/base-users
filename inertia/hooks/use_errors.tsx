import { useToast } from '@/components/ui/use-toast'
import { useEffect } from 'react'

export const useErrors = (props: any, defaultMessage?: string) => {
  const { toast } = useToast()

  useEffect(() => {
    const errors = props.errors

    if (errors) {
      console.log('%cuse_errors.tsx (11) -> errors', 'background: #FF0000; color:#FFFFFF', errors)
      if (errors['E_ALREADY_EXIST'])
        toast({
          variant: 'destructive',
          description: 'Cet email est déjà utilisé',
        })
      else
        toast({
          variant: 'destructive',
          description: defaultMessage || 'Une erreur est survenue',
        })
    }
  }, [props.errors])
}
