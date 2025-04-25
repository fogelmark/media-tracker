import React from 'react'

export default function Page() {
  return (
    <div className='flex gap-10 justify-center items-center min-h-screen'>
      <div className='size-64 rounded-md flex justify-center items-center text-neutral-900 text-3xl font-bold bg-red-500/80'>red pill</div>
      <div className='size-64 rounded-md flex justify-center items-center text-neutral-900 text-3xl font-bold bg-blue-500/80'>blue pill</div>
    </div>
  )
}
