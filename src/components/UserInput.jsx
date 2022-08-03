import { useState } from "react";
import { changeUser } from "../store/slices/user.slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import imgPokedex from '../assets/imgPokedex.png'
import App from '../styles/App.css'

const UserInput = () => {

    const [ userName, setUserName ] = useState('')
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        dispatch(changeUser(userName))
        navigate('/Pokedex')
    }

    return (
        <div className="App">
            <img src={imgPokedex} alt="image welcome pokedex" className="imgPokedex"/>
            <h2 className="titleLogin">¡Hola entrenador!</h2>
            <p className="subtitleLogin">Para poder comenzar, dame tu nombre</p>
            <form onSubmit={submit} className='formLogin'>
                <input type="text" placeholder="your name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <button>Submit</button>
            </form>

        </div>
    );
};

export default UserInput;