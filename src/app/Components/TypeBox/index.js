import './TypeBox.css'

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

export default function TypeBox({typeName}) {

    const backgroundColor = colorDict[typeName.toString()].bg
    const color = colorDict[typeName.toString()].text

    return(
        <div className={`type-box`} style={{backgroundColor: backgroundColor}}>
            <span style={{color: color}} >{typeName.charAt(0).toUpperCase() + typeName.slice(1) + ' '} </span>  
        </div> 
    )
}