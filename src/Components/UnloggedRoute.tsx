import { Navigate } from "react-router-dom";
import { useValue } from "../Store/store";
import React from "react";

interface IUnloggedRoute{
    children: any;
}

const UnloggedRoute:React.FC<IUnloggedRoute> = (props) => {
    const storage = useValue();
    
    if(storage.getDataUser.id !== ""){
        return <Navigate to="/" />;
    }


    return props.children
}

export default UnloggedRoute;