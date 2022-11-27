import {computed, makeObservable, observable, toJS, action} from "mobx";

import React from "react";
import user from "../data/user.json"

export interface IBook{
    id: any;
    title: string;
    penulis: string;
    tahunTerbit: string;
    image: string;
}

export interface IUser{
    id: any;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ILogin{
    email: string;
    password: string;
}

export interface ITransaction{
    id: any;
    bookId: any;
    userId: any
}

export interface IReservation{
    id: any;
    userId: any;
    bookingDate: string;
    transaction: ITransaction[]
}

const initialUser: IUser = {
    id:"",
    firstName:"",
    lastName:"",
    email:"",
    password:""
}



class ValueStore{
    dataBook: IBook[] = [];
    dataUser: IUser = initialUser
    dataTransaction: ITransaction[] = [];
    dataReservation: IReservation[] = [];

    constructor(){
        makeObservable(this,{
            dataBook: observable,
            dataUser: observable,
            dataTransaction: observable,
            dataReservation: observable,
            getDataReservation: computed,
            getDataTransaction: computed,
            getDataBook: computed,
            getDataUser: computed,
            setDataTransaction: action,
            setDataBook: action,
            setDataUser: action,
            setLogin: action,
            setLogout: action,
            deleteTransaction: action,
            setDataReservation: action
        })
    }

    get getDataReservation(){
        return toJS(this.dataReservation)
    }

    get getDataTransaction(){
        return toJS(this.dataTransaction)
    }

    get getDataUser(){
        const user = localStorage.getItem("user");

        if(user){
            this.dataUser = JSON.parse(user);
        }
        
        return toJS(this.dataUser);
    }

    get getDataBook(){
        return toJS(this.dataBook);
    }

    setDataReservation(item: IReservation){
        const value: IReservation[] = this.dataReservation;

        value.push(item);

        this.dataReservation = value
    }

    setDataTransaction(item: ITransaction){
        const value: ITransaction[] = this.dataTransaction
        
        value.push(item);

        this.dataTransaction = value
    }

    setDataBook(item: IBook[]){
        this.dataBook = item;
    }

    setDataUser(item: IUser){
        this.dataUser = item
    }

    setLogin(item: ILogin){

        const data: any = user.find((Q) => Q.email === item.email);

        if(data){
            this.dataUser = data
            localStorage.setItem("user", JSON.stringify(data));
        }

    }

    setLogout(){
        this.dataUser = initialUser;
        localStorage.removeItem("user");
    }

    deleteTransaction(item: any){
        const data: ITransaction[] = this.dataTransaction;

        this.dataTransaction = data.filter((Q) => Q.id !== item);
    }

}

const valueStore = new ValueStore();

const valueContext = React.createContext(valueStore);
const useValue = () => React.useContext(valueContext);

export {valueStore, valueContext, useValue}