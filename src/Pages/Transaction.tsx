import React, { useMemo } from "react";
import { ITransaction, useValue } from "../Store/store";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css"
import List from "../Components/List";
import {v4 as uuidv4} from "uuid"
import { useNavigate } from "react-router-dom";

export interface IDataTransaction{
    id: any;
    bookId: any;
    quantity: number;
    userId: any;
    title: string;
}

function TransactionObserver() {
    const storage = useValue();
    const navigate = useNavigate();
    const dataAll = useMemo(() => {
        if(storage.getDataTransaction.length === 0 || storage.getDataBook.length === 0){
            return []
        }

        let data: IDataTransaction [] = [];
        for(const a of storage.getDataTransaction){

            if(data.some((item) => item.bookId === a.bookId) === false){
                data.push({
                    id: a.id,
                    bookId: a.bookId,
                    quantity: 1,
                    userId: a.userId,
                    title: storage.getDataBook.find((Q) => Q.id === a.bookId)?.title ?? ""
                })
            }else{
                let index = data.findIndex((Q) => Q.bookId === a.bookId);
                data[index]["quantity"] += 1;
            }
            
        }

        return data;
    }, [storage.getDataBook, storage.getDataTransaction]);

    const handleDelete = (value: any) =>{
        storage.deleteTransaction(value);
    }

    function addDays(days: any) {
        var result = new Date();
        result.setDate(result.getDate() + days);
        let res = result.toISOString().split("T");
        return res[0];
    }

    const handleReservation = () =>{

        const transaction: ITransaction[] = [];

        for(const a of dataAll){
            transaction.push({
                id: a.id,
                bookId: a.bookId,
                userId: a.userId
            })
        }

        storage.setDataReservation({
            id: uuidv4(),
            userId: storage.getDataUser.id,
            bookingDate: addDays(3),
            transaction: transaction
        });

        alert("success to add reservation")
        navigate("/", {replace: true});
    }

    if(dataAll.length === 0){
        return (
            <div className={styles.mainContainerBooks}>
                You don't have any Transaction
            </div>
        )
    }
    

    return (
        <div className={styles.mainContainerBooks}>
            <div className={styles.mainContentBooks}>
                <List data={dataAll} onClick={handleDelete}/>
                <button 
                    style={{
                        backgroundColor:"#2980b9",
                        color:"#ffffff",
                        borderWidth: 0,
                        padding: 7,
                        borderRadius:3,
                        cursor: "pointer",
                        width: "41.5%"
                    }}
                    onClick={handleReservation}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

const Transaction = observer(TransactionObserver);

export default Transaction;


