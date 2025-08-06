import React, {useCallback, useRef, useState} from 'react'
import debounce from 'lodash.debounce'
import styles from './Search.module.scss';
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";


export const Search: React.FC = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        setValue('');
        dispatch(setSearchValue(''));
        inputRef.current?.focus();
    }

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 300),
        []
    );

    const onChangeInput = (event: any) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" width="48">
                <path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32
                 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0
                  6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12
                  0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
                <path d="M0 0h48v48H0z" fill="none"/>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder="Search pizza ..."/>

            {value && (
                <svg
                    onClick={onClickClear}
                    className={styles.clearIcon}
                    height="16" viewBox="0 0 16 16" width="16">
                    <polygon fillRule="evenodd"
                             points="8 9.414 3.707 13.707 2.293 12.293
                          6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293
                          2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414"/>
                </svg>
            )}

        </div>
    )
}
