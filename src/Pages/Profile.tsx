import React from 'react'
import { useValue } from '../Store/store'
import styles from "./style.module.css"

export default function Profile() {
    const storage = useValue();

    return (
        <div className={styles.mainContainerProfile}>
            <div className={styles.mainContentProfile}>
                <h1>My Profile</h1>
                <div>
                    <p className={styles.profileLine}>{storage.getDataUser.firstName + " " + storage.getDataUser.lastName}</p>
                    <p className={styles.profileLine}>{storage.getDataUser.email}</p>
                </div>
            </div>
        </div>
    )
}
