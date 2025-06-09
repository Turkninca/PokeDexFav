"use client";

import Text_Input from "../TextInput";
import "../../Styles/components/segments/Search.css";

import { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import Card from "../Card";

import { observer, Observer } from "mobx-react-lite";
import { reaction, toJS } from "mobx";
import pokemonStore from "@/app/stores/mobxStore";
import usePokemonStore from "../../stores/zustandStore";

import { motion } from "framer-motion";
import Spinner from "../Spinner";


function Search() {
    useEffect(() => {
        // const reactor = reaction(
        //     () => pokemonStore.filterInput, 
        //     (val) => {
        //         console.log("New text input", val) 
        //         const getData = setTimeout(() => {
        //             pokemonStore.filtered()
        //         }, 1000);
        //         return () => clearTimeout(getData);
        //     })
        pokemonStore.fetchPokemonData(`/pokemon/?limit=12&offset=${(pokemonStore.pageNumber - 1) * 12}`)
        // return () => reactor
    }, []);

    

    return (
        <div className="search-container">
            <div className="search-input">
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
                    {pokemonStore.pokemonData.map((pokemon, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}>
                            <Card
                                name={pokemon.name}
                                id={pokemon.id}
                                sprite={pokemon.sprites.other["official-artwork"].front_default}
                                types={pokemon.types.map((type) => [type])}
                            />
                        </motion.div>
                    ))}
                </div>
                )}
            
            <div className="more-button-container">
                <button className="more-button" onClick={() => pokemonStore.fetchNextPokemons(false)}>
                    Load More Pokemon's
                </button>
            </div>
        </div>
    );
}


export default observer(Search)