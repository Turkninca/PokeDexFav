import axios from "axios";
import pokemonInstance from "./instance";
import { makeAutoObservable, reaction } from "mobx";

class DomStore {
    mainInputRef;
    dropdown = false;
    slider = false;

    constructor() {
        makeAutoObservable(this)
    }

    setDropdown(bool) {
        this.dropdown = bool
    }

    setSlider(bool) {
        this.slider = bool
    }

    setRef(ref) {
        this.mainInputRef = ref
    }
}

class DetailsStore {
    pokemonSpecies = new Object
    pokemonDetails = new Object
    fetching = true

    constructor() {
        makeAutoObservable(this)
    }

    toggleFetching(bool) {
        this.fetching = bool
    }

    async fetchSpeciesDetails(pokemonName) {
        const speciesResponse = await pokemonInstance.get(`/pokemon-species/${pokemonName}`)

        this.setSpecies(speciesResponse.data)
    }

    async fetchPokemonDetails(pokemonName) {
        const pokemonResponse = await pokemonInstance.get(`/pokemon/${pokemonName}`)

        this.setPokemon(pokemonResponse.data)
    }

    async fetchPokemon(pokemonName) {
        this.toggleFetching(true)
        await this.fetchPokemonDetails(pokemonName)
        await this.fetchSpeciesDetails(pokemonName)
        this.toggleFetching(false)
    }

    reset() {
        this.setPokemon(new Object)
        this.setSpecies(new Object)
        this.toggleFetching(true)
    }

    setPokemon(detailData)  {
        this.pokemonDetails = detailData
    }

    setSpecies(speciesData) {
        this.pokemonSpecies = speciesData
    }
}

class PokemonStore {
    pokemonData = [];
    loading = true;
    nextUrl = `/pokemon/?limit=12&offset=${(this.pageNumber - 1) * 12}`;
    filterInput = ""
    pageNumber = 0
    sorted = []

    constructor() {
        makeAutoObservable(this);
    }

    setPokemonData(data) {
        this.pokemonData = data;
        this.loading = false;
    }

    setSorted(sortedData) {
        this.sorted = sortedData;
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

    reset() {
        this.pokemonData = []
        this.pageNumber = 0
        this.filterInput = ""
        this.nextUrl = `/pokemon/?limit=12&offset=${(this.pageNumber - 1) * 12}`
    }

    async filtered() {
        console.log("Filtering for: ", this.filterInput);
        this.loading = true;
        const response = await pokemonInstance.get("/pokemon?limit=1025")
        // console.log(response.data.results);
        const filteredList = response.data.results.filter(poke => poke.name.includes(this.filterInput))
        // console.log("Page Number: ", this.pageNumber);
        const detailed = await Promise.all(
            filteredList.slice(0, this.pageNumber * 12).map(poke => axios.get(poke.url).then(res => res.data))
        );

        this.setPokemonData(detailed)
        this.setSorted(pokemonStore.pokemonData.sort((a, b) => a.id - b.id))
        // console.log(this.pokemonData);
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
        this.setPokemonData(detailedList)
        this.setSorted(pokemonStore.pokemonData.sort((a, b) => a.id - b.id))
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
                console.log(this.pageNumber);
                this.setPokemonData([])
                this.pageNumber = 1
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
                console.log(this.pageNumber);
                this.fetchPokemonData(`/pokemon/?limit=${this.pageNumber * 12}&offset=0`)
            } else {
                this.filtered()
            }
        }
    }
}

const pokemonStore = new PokemonStore();
const domStore = new DomStore();
const detailsStore = new DetailsStore();
export { domStore, detailsStore };
export default pokemonStore;

