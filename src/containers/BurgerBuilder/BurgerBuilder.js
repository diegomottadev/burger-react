import React,{ Component } from "react";
import Aux from '../../hoc/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon:0.7
}
class BurgerBuilder extends Component{
    // constructor (props){
    //     super(props);
    //     this.state = {}
    // }
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) =>{
        console.log(type)
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients ={
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAdditon = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdditon;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
    }

    removeIngredientHandler = (type)=>{}
    
    render (){
        return (
                <Aux>
                    <Burger  ingredients={this.state.ingredients}></Burger>
                     <BuildControls ingredientAdded={this.addIngredientHandler} />
                  
                </Aux>
        );
    }
}

export default BurgerBuilder;