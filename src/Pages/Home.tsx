import React, { useEffect, useMemo } from "react";
import {  ITransaction, useValue } from "../Store/store";
import data from "../data/books.json"
import { observer } from "mobx-react-lite";
import { Col, Row } from "antd";
import styles from "./style.module.css"
import CardComponent from "../Components/Card";
import {v4 as uuidv4} from "uuid"

function HomeObserver() {
  const storage = useValue();
  const dataAll = useMemo(() => data ? data : [], [data]);

  useEffect(() => {
      storage.setDataBook(dataAll);
  }, [dataAll]);

  const handleBooked = (value: any) =>{
    const data: ITransaction = {
        id: uuidv4(),
        bookId: value,
        userId: storage.getDataUser.id
    }

    storage.setDataTransaction(data);
  }

  console.log(storage.getDataReservation, "RES")


  if(storage.getDataBook.length === 0){
    return <>Loading...</>
  }

  return (
    <div className={styles.mainContainerBooks}>
        <div className={styles.mainContentBooks}>
            <Row gutter={16}>
                {
                    storage.getDataBook.map((item) =>
                        <Col className="gutter-row" span={6} key={item.id}>
                            <CardComponent value={item} onClick={handleBooked}/>
                        </Col>
                    )
                }
            </Row>
        </div>
    </div>
  );
}

const Home = observer(HomeObserver);

export default Home;


