import Meta from "antd/es/card/Meta";
import React from "react";
import { IBook } from "../Store/store";
import { Card } from 'antd';
import styles from "./style.module.css"

interface ICard{
    value: IBook;
    onClick: (v: any) => void;
}

const CardComponent:React.FC<ICard> = (props) =>{
    
    return(
        <div>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={props.value.image} height={350}/>}
            >
                <Meta title={props.value.title} description={props.value.penulis + " " + props.value.tahunTerbit} />
                <div style={{marginTop: 10}}>
                    <button 
                        className={styles.buttonBooked}
                        onClick={() => props.onClick(props.value.id)}
                    >
                        Booked
                    </button>
                </div>
            </Card>
        </div>
    )
}

export default CardComponent;