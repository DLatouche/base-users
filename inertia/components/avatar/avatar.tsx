import { twMerge } from 'tailwind-merge'

export const Avatar = ({ avatar, className }: { avatar: string; className?: string }) => {
  return (
    <span className={twMerge(className)}>
      <img src={`/images/avatars/${avatar}.webp`} alt="avatar" className="w-9 h-9 rounded-full" />
    </span>
  )
}
