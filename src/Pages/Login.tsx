import React, { useMemo, useState } from 'react';
import styles from "./style.module.css"
import {Input} from "antd"
import Button from '../Components/button';
import { ILogin, useValue } from '../Store/store';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../handler/userLogin';

export default function Login() {
  const [form, setForm] = useState<ILogin>({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const storage = useValue();

  const handleLogin = () => {
    const isHaveLogin: boolean = userLogin(form);

    if(isHaveLogin === true){
      storage.setLogin(form);
      navigate("/profile", {replace: true});
      window.location.reload()
    }else{
      alert("Login Failed!")
    }

  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContent}>
        <div>
          <div className={styles.inputArea}>
            <label className={styles.label}>Email</label>
            <Input style={{width: "100%"}} placeholder="Your email" type="email" name="email" onChange={(e) => {setForm({...form, email: e.target.value})}}/>
          </div>
          <div className={styles.inputArea}>
            <label className={styles.label}>Password</label>
            <Input.Password placeholder="input password" name="password" onChange={(e) => {setForm({...form, password: e.target.value})}}/>
          </div>
          <div className={styles.inputArea}>
             <Button word="Submit" type="submit" onClick={handleLogin}/>
          </div>
        </div>
      </div>
    </div>
  )
}
