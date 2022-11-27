import React from 'react'
import { IDataReservation } from '../Pages/Reservation';
import { IDataTransaction } from '../Pages/Transaction'
import styles from "./style.module.css"

interface IList{
    data?: IDataTransaction[];
    dataRes?: IDataReservation[];
    onClick: (v: any) => void;
    for?: string;
}

const List: React.FC<IList> = (props) => {
  

  if(props.for === "reservation"){

    if(!props.dataRes){
      return null;
    }

    return(
      <div>
          {props.dataRes.map((item) => 
            <div className={styles.listStyle} key={item.id}>
                <p className={styles.valueList}>{item.title}</p>
                <p className={styles.valueList}>{item.bookingDate}</p>
            </div>
          )}
      </div>
    )
  }

  if(!props.data){
    return null;
  }
    
  return (
    <div>
        {props.data.map((item) => 
            <div className={styles.listStyle} key={item.id}>
                <p className={styles.valueList}>{item.title}</p>
                <p className={styles.valueList}>{item.quantity} qty</p>
                <button className={styles.valueList} onClick={() => props.onClick(item.id)}>Delete</button>
            </div>
        )}
    </div>
  )
}

export default List;
