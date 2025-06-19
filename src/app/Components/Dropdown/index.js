import { domStore } from "@/app/stores/mobxStore"
import { useRef } from "react"

import './Dropdown.css'

export default function Dropdown() {

    const buttonRef = useRef(null)

    function handleClick() {
        domStore.setDropdown(!domStore.dropdown)
        buttonRef.current.style.transform = `rotate(${domStore.dropdown ? '-90deg' : '90deg'})`
    }

    return(
        <div className="h-[50px] w-[350px] rounded-[3px] bg-gray-900 flex justify-end">
            <button className="justify-self-end self-center mr-[15px] duration-[0.6s]" style={{transform: 'rotate(90deg)'}} ref={buttonRef} onClick={() => handleClick()}>
                <p className="text-amber-400 text-[40px] font-[900] ">{`\>`}</p>
            </button>
        </div>
    )
}