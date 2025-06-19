"use client";

import Text_Input from "../TextInput";
import "./segments/Search.css";

import { useEffect, useState, useLayoutEffect, useRef } from "react";
import axios from "axios";
import Card from "../Card";

import { observer, Observer } from "mobx-react-lite";
import { reaction, toJS } from "mobx";
import pokemonStore, { domStore } from "@/app/stores/mobxStore";
import usePokemonStore from "../../stores/zustandStore";

import { motion } from "framer-motion";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";


function Search() {
    const mySectionRef = useRef(null);
    const router = useRouter()


    useEffect(() => {
        domStore.setRef(mySectionRef)
        // const reactor = reaction(
        //     () => pokemonStore.filterInput, 
        //     (val) => {
        //         console.log("New text input", val) 
        //         const getData = setTimeout(() => {
        //             pokemonStore.filtered()
        //         }, 1000);
        //         return () => clearTimeout(getData);
        //     })
        pokemonStore.reset()
        pokemonStore.fetchNextPokemons(false)
        // return () => reactor
    }, []);



    return (
        <div className="search-container">
            <div className="search-input" ref={mySectionRef} id="my-input">
                <Text_Input
                    style="h-[60px]"
                    fontSize="text-[135%]"
                    placeholder="Favorite a Pokemon"
                    iconSize="28"
                />
            </div>
                {pokemonStore.loading ? (
                    <Spinner />
                ) : (
                <div className="results-container">
                    {pokemonStore.sorted.map((pokemon, index) => (
                        <motion.div 
                            key={pokemon.id.toString() + pokemon.name + index.toString()}
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}>
                            <Card
                                name={pokemon.name}
                                id={pokemon.id}
                                sprite={pokemon.sprites.other["official-artwork"].front_default}
                                types={pokemon.types.map((type) => [type])}
                                router={router}
                            />
                        </motion.div>
                    ))}
                </div>
                )}
            
            <div className="more-button-container">
                <button className="more-button" onClick={() => pokemonStore.fetchNextPokemons(false)}>
                    Load More Pokemon&apos;s
                </button>
            </div>
        </div>
    );
}


export default observer(Search)