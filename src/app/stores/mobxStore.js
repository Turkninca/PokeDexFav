import axios from "axios";
import pokemonInstance from "./instance";
import { makeAutoObservable, reaction } from "mobx";

class PokemonStore {
    pokemonData = [];
    loading = true;
    nextUrl = "";
    filterInput = ""
    pageNumber = 1

    constructor() {
        makeAutoObservable(this);
    }

    setPokemonData(data) {
        this.pokemonData = data;
        this.loading = false;
    }

    setFilterInput(text) {
        this.filterInput = text
    }

    nextPage() {
        this.pageNumber++
    }

    setNextUrl(url) {
        this.nextUrl = url;
    }

    async filtered() {
        console.log("Filtering for: ", this.filterInput);
        this.loading = true;
        const response = await pokemonInstance.get("/pokemon?limit=1025")
        console.log(response.data.results);
        const filteredList = response.data.results.filter(poke => poke.name.includes(this.filterInput))
        console.log("Page Number: ", this.pageNumber);
        const detailed = await Promise.all(
            filteredList.slice(0, this.pageNumber * 12).map(poke => axios.get(poke.url).then(res => res.data))
        );

        this.setPokemonData(detailed)
        console.log(this.pokemonData);
    }

    async fetchPokemonData(requestUrl) {
        this.loading = true;
        
        const response = await pokemonInstance.get(requestUrl)
        let pokeList = response.data.results
        let detailedList = []
        const detailed = await Promise.all(
            pokeList.map(async (pokemon) => {
                const res = await axios.get(pokemon.url);
                detailedList.push(res.data)
            })
        )

        this.setNextUrl(response.data.next)
        this.setPokemonData(this.pokemonData.concat(detailedList))
        //this.pokemonData.push(...detailedList)
        //this.setPokemonData(detailedList)
    }

    async fetchNextPokemons(isSearchButton) {
        console.log(this.nextUrl);
        console.log(this.filterInput);
        this.nextPage()
        if (isSearchButton) {
            if (this.filterInput == "") {
                console.log("True");
                this.setPokemonData([])
                this.pageNumber = 0
                this.fetchPokemonData("/pokemon/?limit=12&offset=0")
                return 0
            } else {
                this.pageNumber = 1
                this.filtered()
                return 0
            }
        } else {
            if (this.filterInput == "") {
                console.log("True");
                this.fetchPokemonData(this.nextUrl)
            } else {
                this.filtered()
            }
        }
    }
}

const pokemonStore = new PokemonStore();
export default pokemonStore;