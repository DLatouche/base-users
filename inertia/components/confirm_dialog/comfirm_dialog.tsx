import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'

type ConfirmDialogProps = {
  isOpen: boolean
  message: string
  title: string
  onCancel?: () => void
  onConfirm: () => void
  setIsOpen: (open: boolean) => void
}
export const ConfirmDialog = ({
  isOpen,
  message,
  title,
  setIsOpen,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false)
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    setIsOpen(false)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 gap-4">
          <AlertDialogCancel className="mt-0" onClick={handleCancel}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Continuer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
