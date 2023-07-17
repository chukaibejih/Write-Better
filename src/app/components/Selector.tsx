import React from 'react'
import { TextIcon } from './icons'


const Selector = () => {


  return (
    <div className="flex flex-col items-center justify-start gap-4 px-6 pt-[130px]">
    <TextIcon />
    <div className="flex flex-col items-center justify-start gap-2 cursor-pointer">
        <p className="font-medium text-sm text-textDark text-center">Select a text</p>
        <p className="font-medium text-textLight text-xs">Please click a text layer to get started</p>
    </div>
  </div>
  )
}

export default Selector