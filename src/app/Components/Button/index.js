'use client';

import '../../Styles/components/Button.css'
import { useRouter } from 'next/navigation';

export default function RegisterButton({ type = "SignIn" }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(type);
    }

    return(
        <button className='button-container' onClick={handleClick}>
            <div className={`buttonbg ${type == 'SignIn' ? 'bg-[#5562eb] hover:bg-[#3a49b4]' : 'transparent'}`}>
                <span className={`opacity-100 ${type == 'SignIn' ? 'text-[#ffffff]' : 'text-[#5562eb]'}`}>
                    {type == 'SignIn' ? 'Sign In' : 'Login'}
                </span>
            </div>
            <div className={`shadow ${type == 'SignIn' ? 'bg-gray-500' : 'bg-gray-200'}`}/>
        </button>
    )
}