import React, {useContext, useEffect, useRef, useState} from 'react'
import qs from 'qs';
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {setCategoryId, setFilters} from "../redux/slices/filterSlice";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";

import {Pagination} from "../components/Pagination";
import {SearchContext} from "../App";

export const Home = () => {
    const navigate = useNavigate();
    const {categoryId, sortType, currentPage} = useSelector(
        (state) => state.filter
    );
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const {searchValue} = useContext(SearchContext);
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [sortBy, orderLabel] = sortType.split(' ');
    const order = orderLabel?.toLowerCase().replace(/[()]/g, '') || 'desc';


    const fetchPizzas = () => {
        setIsLoading(true);
        const baseUrl = `https://6851d68f8612b47a2c0b62f3.mockapi.io/api/v1/items`;

        const params = new URLSearchParams();
        if (categoryId !== 0) {
            params.append('category', categoryId)
        }
        if (searchValue !== '') {
            params.append('search', searchValue);
        }
        params.append('page', currentPage);
        params.append('limit', 4);
        params.append('sortBy', sortBy);
        params.append('order', order);

        const url = `${baseUrl}?${params.toString()}`;

        axios.get(url)
            .then((res) => {
                setPizzas(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setPizzas([]);
                } else {
                    console.log('Error fetching pizzas:', err);
                }
            })
        window.scrollTo(0, 70);
    }

    //if we changed parameters and there was a first render
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortBy,
                order,
                categoryId,
                currentPage
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortType, currentPage]);

    //if there was a first render then we check URL-parameters and store them in redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            dispatch(
                setFilters(params)
            );

            isSearch.current = true;
        }
    }, []);

    //if there was a 1st render, then we request pizzas
    useEffect(() => {
        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sortType, searchValue, currentPage]);


    const fetchedPizzas =
        pizzas
            .map((obj) => (
                <PizzaBlock key={obj.id} product={obj}/>
            ));

    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => dispatch(setCategoryId(id))}/>
                <Sort/>
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : fetchedPizzas
                }
            </div>
            <Pagination/>
        </div>
    )
}

