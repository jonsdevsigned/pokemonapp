import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const PokemonItem = ({ pokemonUrl }) => {

    const [pokemon, setPokemon] = useState({})
    const [pokemonSecondType, setPokemonSecondType] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(pokemonUrl).then(res => setPokemon(res.data))
        axios.get(pokemonUrl).then(res => setPokemonSecondType(res.data))
    }, [])


    return (
        <div className="pokemonCard gradient" onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
            <img className="imgPokeCard" src={pokemon.sprites?.other["official-artwork"].front_default} alt="" />
            <h3>{pokemon.name}</h3>
            <p className="subtittleTypeCard"><b>type </b>{pokemon.types?.[0].type.name} / {pokemonSecondType.types?.[0].type.name}</p>
            <hr />
            <ul>
                <li><b>{pokemon.stats?.[0].stat.name} </b>{pokemon.stats?.[0].base_stat}</li>
                <li><b>{pokemon.stats?.[1].stat.name} </b>{pokemon.stats?.[1].base_stat}</li>
                <li><b>{pokemon.stats?.[2].stat.name} </b>{pokemon.stats?.[2].base_stat}</li>
                <li><b>{pokemon.stats?.[5].stat.name} </b>{pokemon.stats?.[5].base_stat}</li>
            </ul>
        </div>
    );
};

export default PokemonItem;