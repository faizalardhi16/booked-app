import React from "react";
import styles from "./style.module.css"


interface IButton{
    type?: string;
    word?: string;
    onClick: () => void;
}

const Button: React.FC<IButton> = (props) => {

    if(props.type === "submit"){
        return <button className={styles.buttonStyle} type="submit" onClick={props.onClick}>{props.word}</button>
    }

    return(
        <button className={styles.buttonStyle} onClick={props.onClick}>{props.word}</button>
    )
}

export default Button;