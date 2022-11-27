import React, { useMemo } from "react";
import { IReservation, useValue } from "../Store/store";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css"
import List from "../Components/List";
import {v4 as uuidv4} from "uuid"
import { useNavigate } from "react-router-dom";

export interface IDataReservation{
    id: any;
    bookId: any;
    bookingDate: string;
    userId: any;
    title: string;
}

function ReservationObserver() {
    const storage = useValue();
    const navigate = useNavigate();

    const dataAll = useMemo(() => {

        if(storage.getDataReservation.length === 0 || storage.getDataBook.length === 0){
            return []
        }

        const data: IDataReservation[] = [];

        storage.getDataReservation.forEach((item) =>
            item.transaction.forEach((t) => {
                data.push({
                    id: t.id,
                    bookId: t.bookId,
                    bookingDate: item.bookingDate,
                    userId: t.userId,
                    title: storage.getDataBook.find((q) => q.id === t.bookId)?.title ?? ""
                });
            })
        );

        return data
    },[storage.getDataReservation, storage.getDataBook]);

    
    if(dataAll.length === 0){
        return (
            <div className={styles.mainContainerBooks}>
                You might not have any Reservation
            </div>
        )
    }
    
    
    return(
        <div className={styles.mainContainerBooks}>
            <div className={styles.mainContentBooks}>
                <List for="reservation" dataRes={dataAll} onClick={() => console.log()}/>
            </div>
        </div>
    )
}

const Reservation = observer(ReservationObserver);

export default Reservation;


