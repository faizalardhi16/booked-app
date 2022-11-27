import dataUser from "../data/user.json";
import { ILogin } from "../Store/store";

const userLogin = (item: ILogin) =>{
    const isExist = dataUser.some((Q) => Q.email === item.email);

    if(isExist === true){
        return true
    }

    return false
}


export {userLogin}