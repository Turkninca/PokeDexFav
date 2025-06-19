'use client'

import "./segments/Navi_Bar.css"

import RegisterButton from "../Button"
import Text_Input from "../TextInput"
import { useRouter } from "next/navigation"

export default function NaviBar() {

    const router = useRouter()

    function handleClick() {
        router.replace("/")
    }

    return(
        <div className='navi-bar'>
            <button className="image-box" onClick={() => handleClick()}>
                <img src={"./favicon.png"} alt="ayakkabı" className="h-[40px] pl-[80px]"/>
            </button>
            <div className="text-input-container">
                <Text_Input style='h-[40px]'/>
            </div>
            <div className="buttons-container">
                <RegisterButton type="SignIn" />
                <RegisterButton type="Login" />
            </div>
        </div>
    )
}