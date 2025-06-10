import "../../Styles/components/segments/Navi_Bar.css"

import RegisterButton from "../Button"
import Text_Input from "../TextInput"

export default function NaviBar() {
    return(
        <div className='navi-bar'>
            <div className="image-box">
                <img src={"./favicon.png"} alt="ayakkabı" className="h-[40px] pl-[80px]"/>
            </div>
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