import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props)=>{
    //Mapea cada elemento del objeto ingrediente, mira la cantidad de cada ingrediente
    //Crea un array por cada elemento
    let transformIngredients = Object.keys(props.ingredients)
    .map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i) =>{
           return <BurgerIngredient key={igKey+ i} type={igKey}/>
        }) //[key,value]
    }).reduce((arr, el)=>{
        return arr.concat(el )
    },[]);
    if (transformIngredients.length === 0){
        transformIngredients = <p>Please start adding an ingredient</p>
    }
    console.log(transformIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
                {transformIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>

        </div>
    );
}

export default burger;