import { observer } from 'mobx-react-lite';
import '../../Styles/components/Card.css';

import React from 'react';

const colorDict = {
  "bug": {
    "bg": "#A6B91A",
    "text": "#355E3B",
    "gradient": ["#A6B91A", "#94BC4A"]
  },
  "dragon": {
    "bg": "#6F35FC",
    "text": "#FFFFFF",
    "gradient": ["#6F35FC", "#8572C8"]
  },
  "fairy": {
    "bg": "#D685AD",
    "text": "#FFFFFF",
    "gradient": ["#D685AD", "#E8B0EB"]
  },
  "fire": {
    "bg": "#EE8130",
    "text": "#9B2C2C",
    "gradient": ["#EE8130", "#e88e5d"]
  },
  "ghost": {
    "bg": "#735797",
    "text": "#FFFFFF",
    "gradient": ["#735797", "#816DB6"]
  },
  "ground": {
    "bg": "#E2BF65",
    "text": "#5A432A",
    "gradient": ["#E2BF65", "#CEB250"]
  },
  "normal": {
    "bg": "#A8A77A",
    "text": "#1A1A1A",
    "gradient": ["#A8A77A", "#ACAD99"]
  },
  "psychic": {
    "bg": "#F95587",
    "text": "#FFFFFF",
    "gradient": ["#F95587", "#E96C95"]
  },
  "steel": {
    "bg": "#B7B7CE",
    "text": "#1A1A1A",
    "gradient": ["#B7B7CE", "#9FA9AF"]
  },
  "dark": {
    "bg": "#705746",
    "text": "#FFFFFF",
    "gradient": ["#705746", "#79726B"]
  },
  "electric": {
    "bg": "#F7D02C",
    "text": "#5A4F01",
    "gradient": ["#F7D02C", "#E7C536"]
  },
  "fighting": {
    "bg": "#C22E28",
    "text": "#FFFFFF",
    "gradient": ["#C22E28", "#C45D4C"]
  },
  "flying": {
    "bg": "#A98FF3",
    "text": "#004E64",
    "gradient": ["#A98FF3", "#90AAD7"]
  },
  "grass": {
    "bg": "#7AC74C",
    "text": "#22543D",
    "gradient": ["#7AC74C", "#82C95B"]
  },
  "ice": {
    "bg": "#96D9D6",
    "text": "#1A1A1A",
    "gradient": ["#96D9D6", "#81CFD7"]
  },
  "poison": {
    "bg": "#A33EA1",
    "text": "#FFFFFF",
    "gradient": ["#A33EA1", "#B369AF"]
  },
  "rock": {
    "bg": "#B6A136",
    "text": "#1A1A1A",
    "gradient": ["#B6A136", "#BAA85E"]
  },
  "water": {
    "bg": "#6390F0",
    "text": "#1E3A8A",
    "gradient": ["#6390F0", "#7eace6"]
  }
}

function Card({ sprite, id, name, types}) {

    function offsetId(number, offsetWidth) {
        return (("0".repeat((offsetWidth - number.toString().length))) + number.toString()) 
    }

    let typeList = []
    types.map((type) => {typeList.push(type[0].type.name)});

    const gradients = typeList.map((typeName) => colorDict[typeName.toString()].gradient)

    const background = gradients.length === 1
        ? `linear-gradient(45deg, ${gradients[0][0]} 25%, ${gradients[0][1]} 40%, ${gradients[0][0]} 80%)`
        : `linear-gradient(45deg, ${gradients[0][0]} 25%, ${gradients[1][0]} 40%, ${gradients[0][0]} 80%)`;

    const backgroundColor = typeList.map((typeName) => colorDict[typeName.toString()].bg)
    const color = typeList.map((typeName) =>colorDict[typeName.toString()].text)

    return(
        <button className={`card-container`} style={{ background, backgroundSize: "300% 300%" }} onClick={() => alert(name)}>
            <div className="sprite-container">
                <img src={sprite} className='card-sprite'/>
            </div>
            <div className="name-container">
                <p className={`text-gray-500 justify-self-center `}>{"#" + offsetId(id, 4)}</p>
                <p className='name-text self-center'>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
                <div className="types-container">
                    {typeList.map((typeName, index) => {
                        return(
                            <div key={index} className={`type-box`} style={{backgroundColor: backgroundColor[index]}}>
                                <span className={``} style={{color: color[index]}} >{typeName.charAt(0).toUpperCase() + typeName.slice(1) + ' '} </span>  
                            </div> 
                        )
                    })}
                </div>
            </div>
        </button>
    )
}

export default Card