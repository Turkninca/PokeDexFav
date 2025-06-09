import { observer } from 'mobx-react-lite';
import '../../Styles/components/Card.css';

import React from 'react';

const colorDict = {
  "bug": "bg-green-800",
  "dragon": "bg-orange-500",
  "fairy": "bg-pink-300",
  "fire": "bg-orange-400",
  "ghost": "bg-indigo-700",
  "ground": "bg-yellow-600",
  "normal": "bg-gray-400",
  "psychic": "bg-pink-500",
  "steel": "bg-slate-400",
  "dark": "bg-neutral-700",
  "electric": "bg-yellow-300",
  "fighting": "bg-orange-600",
  "flying": "bg-cyan-300",
  "grass": "bg-lime-400",
  "ice": "bg-cyan-200",
  "poison": "bg-purple-400",
  "rock": "bg-yellow-800",
  "water": "bg-blue-600"
}

function Card({ sprite, id, name, types}) {

    function offsetId(number, offsetWidth) {
        return (("0".repeat((offsetWidth - number.toString().length))) + number.toString()) 
    }

    let typeList = []
    types.map((type) => typeList.push(type[0].type.name));


    return(
        <button className='card-container' onClick={() => alert(name)}>
            <div className="sprite-container">
                <img src={sprite} className='card-sprite'/>
            </div>
            <div className="name-container">
                <p className='text-gray-500 justify-self-center'>{"#" + offsetId(id, 4)}</p>
                <p className='name-text self-center'>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
                <div className="types-container">
                    {typeList.map((typeName, index) => {
                        return(
                            <div key={index} className={`type-box ${colorDict[typeName.toString()]}`}>
                                <span >{typeName.charAt(0).toUpperCase() + typeName.slice(1) + ' '} </span>  
                            </div> 
                        )
                    })}
                </div>
            </div>
        </button>
    )
}

export default Card