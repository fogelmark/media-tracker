import React from 'react'

export default function GenreSkeleton() {
  return (
    <div className='flex flex-wrap gap-2 animate-pulse'>
      {['w-28', 'w-24', 'w-36', 'w-32', 'w-24', 'w-32', 'w-28', 'w-36', 'w-28', 'w-24', 'w-36', 'w-32'].map((width, index) => (
      <div key={index} className={`h-8 ${width} rounded bg-slate-700`} />
      ))}
    </div>
  )
}
