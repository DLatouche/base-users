import { ConfirmDialog } from '@/components/confirm_dialog/comfirm_dialog'
import { useState, useCallback } from 'react'

type UseConfirmProps = {
  message?: string
  title?: string
  onCancel?: () => void
}

export const useConfirm = ({ message = '', title = '', onCancel }: UseConfirmProps) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<string>(message)
  const [currentTitle, setCurrentTitle] = useState<string>(title)
  const [currentOnConfirm, setCurrentOnConfirm] = useState<() => void>(() => {})

  const handleConfirm = useCallback(() => {
    currentOnConfirm()
    setOpenConfirmDialog(false)
  }, [currentOnConfirm])

  const askConfirmation = useCallback(
    (data: { title?: string; message?: string; onConfirm: () => void }) => {
      setCurrentTitle(data.title || currentTitle)
      setCurrentMessage(data.message || currentMessage)
      setCurrentOnConfirm(() => data.onConfirm)
      setOpenConfirmDialog(true)
    },
    [currentTitle, currentMessage]
  )

  const renderConfirmDialog = useCallback(
    () => (
      <ConfirmDialog
        isOpen={openConfirmDialog}
        message={currentMessage}
        title={currentTitle}
        onConfirm={handleConfirm}
        setIsOpen={setOpenConfirmDialog}
        onCancel={onCancel}
      />
    ),
    [openConfirmDialog, currentMessage, currentTitle, handleConfirm, onCancel]
  )

  return { ConfirmDialog: renderConfirmDialog, askConfirmation }
}
