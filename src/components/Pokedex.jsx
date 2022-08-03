import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonItem from "./PokemonItem";
import imgPokedex from '../assets/imgPokedex.png'

const Pokedex = () => {

    const user = useSelector(state => state.user)

    const [ pokemons, setPokemons ] = useState([])
    const [ pokemonSearch, setPokemonSearch ] = useState('')
    const [ types, setTypes ] = useState([])
    

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/')
            .then(res => setPokemons(res.data.results))
        
        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setTypes(res.data.results))

        
    }, [])

    const search = e => {
        e.preventDefault()
        navigate(`/pokemon/${pokemonSearch}`)
    }

    const filterType = e => {
        /* alert('se selecciono el type ' + e.target.value) */
        axios.get(e.target.value)
            .then(res => setPokemons(res.data.pokemon))
    }

    const [ page, setPage ] = useState(1)
    const lastIndex = page * 6
    const firstIndex = lastIndex - 6
    const pokemonsPage = pokemons.slice(firstIndex, lastIndex)

    const lastPage = Math.ceil(pokemons.length / 8)

    const numbers = []
    for(let i = 1; i <= lastPage; i++){
        numbers.push(i)
    }

    return (
        <div className="pokedex">
            <img src={imgPokedex} alt="image pokedex" className="imgPokedexx"/>
            <h1 className="titlePokedex">Pokedex</h1>
            <p className="textUser topBarRed topBarBlack"><b>Welcome {user},</b> here you can find your favorite pokemon</p>
            <form className="formSearch backCircle frontCircle " onSubmit={search}>
                <input type="text"  placeholder="search a pokemon" value={pokemonSearch} onChange={e => setPokemonSearch(e.target.value) }/>
                <button>search</button>
            </form>

            <select className="selectType" onChange={filterType}>
                <option value="">select type pokemon</option>
                {
                    types.map(types => (
                        <option value={types.url} key={types.url}>{types.name}</option>
                    ))
                }
            </select>

            <div>
                <button onClick={() => setPage(page-1)} disabled={page === 1}>previous</button>
                {numbers.map(number =>(
                    <button onClick={() => setPage(number)}>{number}</button>
                ))}
                <button onClick={() => setPage(page+1)} disabled={page === lastPage}>Next</button>
            </div>
            
            <div className='contentPokemonsCards'>
                <ul>
                    {pokemonsPage.map(pokemon => (
                        <PokemonItem pokemonUrl={pokemon.url ? pokemon.url : pokemon.pokemon?.url} key={pokemon.name ? pokemon.name : pokemon.pokemon?.name} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Pokedex;