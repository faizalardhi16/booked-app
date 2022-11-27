import React, { useEffect, useMemo } from "react";
import {  useValue } from "../Store/store";
import data from "../data/books.json"
import { observer } from "mobx-react-lite";
import { Col, Row } from "antd";
import styles from "./style.module.css"
import CardComponent from "../Components/Card";

interface IBookPage{}

const BooksPage: React.FC<IBookPage> = () => {
    const storage = useValue();
    const dataAll = useMemo(() => data ? data : [], [data]);

    useEffect(() => {
        storage.setDataBook(dataAll);
    }, [dataAll]);

    return (
        <div className={styles.mainContainerBooks}>
            
        </div>
    );
}

const Books = observer(BooksPage);

export default Books;



