import * as happyFramework from '@framework'

export default function Card({children, size}) {
  return (
    <div className={`card card-${size ?? 'sm'}`}>
      {children}
    </div>
  )
}
