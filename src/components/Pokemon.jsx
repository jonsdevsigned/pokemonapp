import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import imgPokedex from '../assets/imgPokedex.png'

const Pokemon = () => {

    const [ pokemon, setPokemon ] = useState({})
    const [ moves, setMoves ] = useState([])

    const { id } = useParams()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => setPokemon(res.data))

        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => setMoves(res.data.moves))
    },[id])

    console.log(moves)

    return (
        <div className='pokemon backCircle frontCircle background'>
            <img src={imgPokedex} alt="image pokedex" className="imgPokedexx"/>
            <img src={pokemon.sprites?.other["official-artwork"].front_default} className='imgPokemon' alt={`image ${pokemon.name}`} />
            <p className='topBarBlack topBarRed idPokemon'>#{pokemon.id}</p>
            <h1 className='titleNamePokemon'>{pokemon.name}</h1>
            
            <div className='weightAndHeight'>
                <p><b>Weight</b> {pokemon.weight}</p>
                <p><b>Height</b> {pokemon.height}</p>
            </div>

            <div className='typeAndAbilities'>
                <ul>
                    <h3 className='titlePokemonType'>Type</h3>
                    <li className='pokemonTypeA'>{pokemon.types?.[0].type.name}</li>
                    <li className='pokemonTypeB'>{pokemon.types?.[1].type.name}</li>
                </ul>

                <ul>
                    <h3 className='titlePokemonAbilities'>Abilities</h3>
                    <li>{pokemon.abilities?.[0].ability.name}</li>
                    <li>{pokemon.abilities?.[0].ability.name}</li>
                </ul>
            </div>

            <div className=''>
                <h3>Stats</h3>
                <ul>
                <li><b>{pokemon.stats?.[0].stat.name} </b>{pokemon.stats?.[0].base_stat}</li>
                <li><b>{pokemon.stats?.[1].stat.name} </b>{pokemon.stats?.[1].base_stat}</li>
                <li><b>{pokemon.stats?.[2].stat.name} </b>{pokemon.stats?.[2].base_stat}</li>
                <li><b>{pokemon.stats?.[5].stat.name} </b>{pokemon.stats?.[5].base_stat}</li>
                </ul>
            </div>

            <div>
                <h3>Movements</h3>
                <ul key={moves.move?.url}>
                    {moves.map(moves => (
                        <li>{moves.move?.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Pokemon;