import React, {useEffect, useRef} from 'react'
import qs from 'qs';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom'
import {selectFilter, setCategoryId, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice"
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";

import {Pagination} from "../components/Pagination";

export const Home = () => {
    const navigate = useNavigate();
    const {categoryId, sortType, currentPage, searchValue} = useSelector(selectFilter);
    const {items, status} = useSelector(selectPizzaData);
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const [sortBy, orderLabel] = sortType.split(' ');
    const order = orderLabel?.toLowerCase().replace(/[()]/g, '') || 'desc';


    function buildUrl() {
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

        return `${baseUrl}?${params.toString()}`;
    }

    const getPizzas = async () => {
        const url = buildUrl();

        dispatch(fetchPizzas(
            {url}
        ));

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
            getPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sortType, searchValue, currentPage]);


    const fetchedPizzas =
        items
            .map((obj) => (
                <Link key={obj.id} to={`/pizza/${obj.id}`}>
                    <PizzaBlock key={obj.id} {...obj}/>
                </Link>
            ));
    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => dispatch(setCategoryId(id))}/>
                <Sort/>
            </div>
            <h2 className="content__title">All pizzas</h2>
            {
                status === 'error' ?
                    <div className="content__error-info">
                        <h2>The error happened :(</h2>
                        <p>
                            Failure while fetching the pizzas. Try again later.
                        </p>
                    </div>
                    :
                    <div className="content__items">
                        {
                            status === 'loading' ? skeletons : fetchedPizzas
                        }
                    </div>
            }

            <Pagination/>
        </div>
    )
}

