import Image from 'next/image'

export function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="logo"
      width={40}
      height={40}
      quality={100}
      priority
    />
  )
}
