import { create } from "zustand";
import axios from "axios";

const usePokemonStore = create((set) => ({
    loading: true,
    pokemonData: [],
    fetchPokemonData: async () => {
        set({loading: true})
        try {
            let pokeList = []
            console.log("Fetching Pokemon data...");
            const response = await axios.get(
                "https://pokeapi.co/api/v2/pokemon/?limit=6&offset=0"
            );
            console.log("Pokemon data fetched successfully:", response.data.results);
            pokeList = response.data.results;
            
            let pokemonDetails = [];
            pokeList.forEach(async (pokemon) => {
                console.log(`Fetching details for ${pokemon.name}...`);
                const res = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                );
                pokemonDetails.push(res.data)
                console.log(`Fetched details for ${pokemon.name}...`);
                console.log(pokemonDetails);
            });
            set({ pokemonData: pokemonDetails, loading: false });
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    },
}));

export default usePokemonStore;
