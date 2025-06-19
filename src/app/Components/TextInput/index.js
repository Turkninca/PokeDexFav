'use client';

import pokemonStore from '@/app/stores/mobxStore';
import { domStore } from '@/app/stores/mobxStore';
import './Text_Input.css'
import { FaSearch } from "react-icons/fa";

import { mySectionRef } from '../Segments/Search';

export default function Text_Input({
    style = "h-[40px]",
    fontSize = "text-[100%]",
    placeholder = "Search Pokemon",
    iconSize = "20",
}) {

    function scrollToSection() {
        console.log("Scrolling");
        domStore.mainInputRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={`${style} input-container`}>
            <div className="input-box">
                <input
                    className={fontSize}
                    type="text"
                    placeholder={placeholder}
                    onChange={text => pokemonStore.setFilterInput(text.target.value)}
                />
                <button className="text-input-icon" onClick={() => {
                    scrollToSection()
                    pokemonStore.fetchNextPokemons(true)}}>
                    <FaSearch size={iconSize} />
                </button>
            </div>
        </div>
    );
}