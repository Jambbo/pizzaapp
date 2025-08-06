import React from 'react'
import styles from './NotFoundBlock.module.scss'


export const NotFoundBlock: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1 >
                Nothing was found :(
            </h1>
            <p className={styles.description}>
                Unfortunately, this page doesn't exist in our e-shop
            </p>
        </div>
    )
}

