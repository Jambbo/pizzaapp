import React from 'react'
import {Link} from "react-router-dom";
import cartEmptyImg from '../assets/img/empty-cart.png';


export const CartEmpty = () => {
    return (
        <div className="cart cart--empty">
            <h2>
                Cart is empty <span>😕</span>
            </h2>
            <p>
                Probably, you have not added any pizzas to your cart.
                <br />
                To order pizza, enter the main page.
            </p>
            <img src={cartEmptyImg} alt="Empty cart" />
            <Link to="/" className="button button--black">
                <span>Back</span>
            </Link>
        </div>

    )
}

