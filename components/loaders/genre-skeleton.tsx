import React from 'react'

export default function GenreSkeleton() {
  return (
    <div className='grid auto-rows-min gap-2 animate-pulse'>
    <div className='h-4 w-16 bg-slate-700 rounded' />
    <div className='flex flex-wrap gap-2'>
      {['w-28', 'w-24', 'w-36', 'w-32', 'w-24', 'w-32', 'w-28', 'w-36', 'w-28', 'w-24', 'w-36', 'w-32', 'w-24', 'w-32', 'w-28', 'w-36'].map((width, index) => (
      <div key={index} className={`h-8 ${width} rounded bg-slate-700`} />
      ))}
    </div>
    </div>
  )
}
