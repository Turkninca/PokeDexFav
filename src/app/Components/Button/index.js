'use client';

import pokemonStore from '@/app/stores/mobxStore';
import './Button.css'
import { useRouter } from 'next/navigation';

export default function RegisterButton({ type = "SignIn" }) {
    const router = useRouter();

    const handleClick = () => {
        pokemonStore.reset([])
        router.push(type);
    }

    return(
        <button className='button-container' onClick={handleClick}>
            <div className={`buttonbg ${type == 'SignIn' ? 'bg-[#5CBC94]' : 'bg-[#425385]'}`}>
                <span className={`${type == 'SignIn' ? 'text-[#FDF4ED]' : 'text-[#FDF4ED]'}`}>
                    {type == 'SignIn' ? 'Sign In' : 'Login'}
                </span>
            </div>
            <div className={`shadow ${type == 'SignIn' ? 'bg-[#45A185]' : 'bg-[#28257E]'}`}/>
        </button>
    )
}