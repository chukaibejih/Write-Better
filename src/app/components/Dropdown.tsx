import React from "react"
import { StarIcon, CorrectIcon, LongerTextIcon, ShorterTextIcon, FormalToneIcon, InformalToneIcon } from "./icons"


type DropdownDataTypes = {
    id: number,
    icon: React.ReactNode,
    text: string
}

const dropdownData: DropdownDataTypes[] = [
    {
        id: 1,
        icon: <StarIcon />,
        text: "Improve writing"
    },
    {
        id: 2,
        icon: <CorrectIcon />,
        text: "Correct grammar and spelling"
    },
    {
        id: 3,
        icon: <ShorterTextIcon />,
        text: "Make text shorter"
    },
    {
        id: 4,
        icon: <LongerTextIcon />,
        text: "Make Text longer",
    },
    {
        id: 5,
        icon: <FormalToneIcon />,
        text: "Make tone formal",
    },
    {
        id: 6,
        icon: <InformalToneIcon />,
        text: "Make tone informal"
    }
]



const Dropdown = ({openDropdown, setTextAction}:{openDropdown: boolean, setTextAction: (value: React.SetStateAction<string>) => void}) => {
  return (
   <div className={`absolute top-12 left-0 right-0 flex-col items-start justify-start gap-[10px] bg-white py-3 w-full shadow-md z-10 mx-auto ${openDropdown ? "flex" : "hidden"}`}>
     {dropdownData.map((item: DropdownDataTypes) => (
        <p
            key={item.id}
            onClick={() => setTextAction(item.text)}
            className="flex items-center justify-start gap-2 px-4 py-[10px] cursor-pointer hover:bg-gray-200 w-full"
        >
            {item.icon}
            <span className="text-[#253858] text-xs">{item.text}</span>
        </p>
    ))}
   </div>
  )
}

export default Dropdown