"use client";

import { useEffect, useRef, useState } from "react";
import "./styles.css";

import { detailsStore, domStore } from "../stores/mobxStore";
import { observer } from "mobx-react-lite";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Spinner from "../Components/Spinner";
import Dropdown from "../Components/Dropdown";
import Slider from "../Components/Slider";
import { reaction } from "mobx";
import TypeBox from "../Components/TypeBox";

function Details() {
    const pokemonName = useSearchParams().get("pokemonName");
    const ref = useRef(null);
    const buttonRef = useRef(null)

    const [dropdown, setDropdown] = useState(true)

    function offsetId(number, offsetWidth) {
        return (("0".repeat((offsetWidth - number.toString().length))) + number.toString()) 
    }

    useEffect(() => {
        detailsStore.fetchPokemon(pokemonName)
        window.scrollTo({top: 0, behavior: 'smooth'})

        const handleScroll = () => {
            try {
                if (window.scrollY > window.innerHeight/2 - 65) {
                ref.current.style.height = "112vh"
                ref.current.style.filter = "blur(3px)"
                ref.current.style.transform = 'translateY(110px)'
                } else {
                    ref.current.style.height = "calc(100vh - 130px)"
                    ref.current.style.filter = ""
                    ref.current.style.transform = ''
                }
            } catch {

            }
            //ref.current.style.height = `calc(${newHeight})`
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleDropdown() {
        setDropdown(!dropdown)
        buttonRef.current.style.transform = `rotate(${dropdown ? '180deg' : '0deg'})`
    }

    function findEng(element) {
        return element.language.name == 'en'
    }

    return (
        <div className="details-container">
            {detailsStore.fetching ? (
                <div className="loading">
                    <Spinner />
                </div>
            ) : (
            <>
                <div className="sticky-container">
                    <img className="image" style={{height: 'calc(100vh - 130px)', transition: '0.6s all'}} ref={ref} src={detailsStore.pokemonDetails.sprites.other["official-artwork"].front_default} alt="bg_image" />
                    <div className="slide-down-container" />
                </div>
                <div className="details-box">
                    <div className="nameId-container">
                        <p className="name-text" >{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</p>
                        <p className="id-text" >{'#' + offsetId(detailsStore.pokemonSpecies.id, 4)}</p>
                        {/* {dropdown ? (
                            <>
                            </>
                        ) : (
                            <Dropdown />
                        )}
                        <button ref={buttonRef} className="text-[30px] ml-[15px] duration-[0.5s]" onClick={() => {handleDropdown()}}>
                            <p>
                                {`\>`}
                            </p>
                        </button> */}
                    </div>
                    <div className="flex justify-center mb-[20px]">
                        <Dropdown />
                    </div>
                    <div className="flex">
                        <div className="other-details-container">
                            <div className="prop-container">
                                <p className="text-[20px] font-[700] self-start" >Height</p>
                                <span >3.03</span>
                            </div>
                            <div className="prop-container">
                                <p className="text-[20px] font-[700] self-start" >Weight</p>
                                <span>15lbs</span>
                            </div>
                            <div className="prop-container">
                                <p className="text-[20px] font-[700] self-start" >Category</p>
                                <span>{detailsStore.pokemonSpecies.genera.find(findEng).genus}</span>
                            </div>
                            <div className="prop-container">
                                <p className="text-[20px] font-[700] self-start" >Abilities</p>
                                <span>OverGrow</span>
                            </div>
                            <div className="prop-container">
                                <p className="text-[20px] font-[700] self-start" >Genders</p>
                                <span>Both</span>
                            </div>
                            <div className="prop-container">
                                <p></p>
                                <span></span>
                            </div>
                        </div>
                        <div className="flex-col w-[50%] h-[inherit] flex p-[15px] pt-[5px]">
                            <div className="flex-1">
                                <p className="text-[20px]">{detailsStore.pokemonSpecies.flavor_text_entries.filter(findEng)[0].flavor_text}</p>
                            </div>
                            <div className="flex-2 flex flex-col ml-[10px]">
                                <p className="text-[25px]">Types:</p>
                                <div className="ml-[10px] flex flex-col gap-[5px]">
                                    {detailsStore.pokemonDetails.types.map((type, index) => {
                                        return(<TypeBox key={index} typeName={type.type.name} />)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sprites-container">
                        <div className="slider-container">
                            <span className="inline">Normal</span>
                            <Slider />
                            <span className="inline">Shiny</span>
                        </div>
                        <div className="carousel-box">
                            <div className="sprite-box">
                                {domStore.slider ? (
                                    <>
                                        <img
                                            className="sprite-image"
                                            src={
                                                detailsStore.pokemonDetails.sprites.other["official-artwork"]['front_shiny']
                                            }
                                            alt="shiny_default"
                                        />
                                        <p>
                                            {detailsStore.pokemonDetails.sprites.other["official-artwork"]['front_shiny'] != null
                                                ? "Front Shiny"
                                                : "There is no shiny front sprite for this variety :("}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            className="sprite-image"
                                            src={
                                                detailsStore.pokemonDetails.sprites.other["official-artwork"]['front_default']
                                            }
                                            alt="front_default"
                                        />
                                        <p>
                                            {detailsStore.pokemonDetails.sprites.other["official-artwork"].front_default != null
                                                ? "Front Default"
                                                : "There is no front sprite for this variety :("}
                                        </p>
                                    </>
                                )}                                
                            </div>
                            <div className="sprite-box">
                                {domStore.slider ? (
                                    <>
                                        <img
                                            className="sprite-image"
                                            src={
                                                detailsStore.pokemonDetails.sprites.other.home.front_shiny
                                            }
                                            alt="home_front_shiny"
                                        />
                                        <p>
                                            {detailsStore.pokemonDetails.sprites.other.home.front_shiny != null
                                                ? "Front Shiny Home Style"
                                                : "There is no home style shiny front sprite for this varietie :("}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            className="sprite-image"
                                            src={
                                                detailsStore.pokemonDetails.sprites.other.home.front_default
                                            }
                                            alt="front_home"
                                        />
                                        <p>
                                            {detailsStore.pokemonDetails.sprites.other.home.front_default != null
                                                ? "Front Home Style"
                                                : "There is no  home style front sprite for this varietie :("}
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="sprite-box">
                                {domStore.slider ? (
                                    <>
                                        <p>
                                            There is no Front Shiny sprite for this variety :{`(`}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            className="sprite-image"
                                            src={
                                                detailsStore.pokemonDetails.sprites.other.dream_world.front_default
                                            }
                                            alt="front_dream_world"
                                        />
                                        <p>
                                            {detailsStore.pokemonDetails.sprites.other.dream_world.front_default != null
                                                ? "Front Dream World Style"
                                                : "There is no Dream World Style Front sprite for this varietie :("}
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="sprite-box">
                                {domStore.slider ? (
                                    <>
                                        <img
                                            className="sprite-image"
                                            src={
                                                detailsStore.pokemonDetails.sprites.other.showdown.front_shiny
                                            }
                                            alt="front_shiny_gif"
                                        />
                                        <p>
                                            {detailsStore.pokemonDetails.sprites.other.showdown.front_shiny != null
                                                ? "Front Shiny GIF"
                                                : "There is no Front Shiny GIF for this variety :("}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            className="sprite-image"
                                            src={
                                                detailsStore.pokemonDetails.sprites.other.showdown.front_default
                                            }
                                            alt="front_gif"
                                        />
                                        <p>
                                            {detailsStore.pokemonDetails.sprites.other.showdown.front_default != null
                                                ? "Front GIF"
                                                : "There is no Front GIF for this variety :("}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
            )}
        </div>
    );
}

export default observer(Details);
