import { Link, Navigate, useNavigate } from "react-router-dom";
import { useValue } from "../Store/store";
import React from "react";
import styles from "./style.module.css"

interface IProtectedRoute{
    children: any;
}

const ProtectedRoute:React.FC<IProtectedRoute> = (props) => {
    const storage = useValue();
    const navigate = useNavigate();

    const handleLogout = () =>{
        storage.setLogout();
        navigate("/", {replace: true})
    }

    if(storage.getDataUser.id === ""){
        return <Navigate to="/login" />;
    }

    return (
        <>
            <div className={styles.navbar}>
               <div>
                    <nav>
                        <Link className={styles.navigator} to="/">Home</Link>
                        <Link className={styles.navigator} to="/profile">Profile</Link>
                        <Link className={styles.navigator} to="/book">Book</Link>
                        <Link className={styles.navigator} to="/transaction">Transaction</Link>
                        <Link className={styles.navigator} to="/reservation">Reservation</Link>
                    </nav>
               </div>
                <div style={{display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around"}}>
                    <p style={{marginRight:15, fontWeight:"bold"}}>Hi, {storage.getDataUser.firstName + " " + storage.getDataUser.lastName}!</p>
                    <button 
                        style={{
                            backgroundColor:"#c0392b",
                            color:"#ffffff",
                            borderWidth: 0,
                            padding: 7,
                            borderRadius:3,
                            cursor: "pointer"
                        }}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            {props.children}
        </>
    )
}

export default ProtectedRoute;