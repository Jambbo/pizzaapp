import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

export const FullPizza: React.FC = () => {
    const [pizzaData, setPizzaData] = useState<{
        imageUrl: string;
        name: string;
        price: number;
    }>();
    const navigate = useNavigate();
    const {id} = useParams();

    const url = `https://6851d68f8612b47a2c0b62f3.mockapi.io/api/v1/items/${id}`;

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(url);
                setPizzaData(data);
            } catch (err) {
                navigate("/");
                alert('Error while fetching pizzas.')
            }
        }
        fetchPizza();
        }, [])

    if(!pizzaData){
        return <>'Loading...'</>;
    }

    return (
        <div className="container">
            <img src={pizzaData.imageUrl} width="500px"/>
            <h2>{pizzaData.name}</h2>
            <h4>{pizzaData.price}</h4>
        </div>
    )
}
