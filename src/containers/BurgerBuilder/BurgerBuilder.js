import React,{ Component } from "react";
import Aux from '../../hoc/Aux/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal  from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
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
        totalPrice: 4,
        purchasable:false,
        purchasing:  false,
        loading: false,
    }

    updatePurchaseState(ingredients){
         const sum =  Object.keys(ingredients)
         .map(igKey =>{
             return ingredients[igKey]
         }).reduce((sum,el)=>{
             return sum+ el;
         }, 0)
         this.setState({purchasable: sum > 0})
    }

    purchaseHandler =()=>{
        this.setState({purchasing:true});
    }


    addIngredientHandler = (type) =>{
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
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        
        if(oldCount <= 0){
            return;
        }

        const updateCount = oldCount -1 ;
        const updateIngredients ={
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }
    
    purchaseCancelHandler= ()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHander=()=>{
        //alert('You continue')
        this.setState({loading:true});
        const order ={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name:'Diego',
                address:{
                    street: 'Test stree',
                    zipcode: '45454',
                    country: 'Argentina'
                },
                email: 'diegomottadev@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json',order)
        .then(response => {this.setState({loading:false, purchasing: false})})
        .catch(response => {this.setState({loading:false, purchasing: true })});

    }

    render (){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary =   <OrderSummary ingredients={this.state.ingredients}
        price={this.state.totalPrice}
         purchaseCancelled={this.purchaseCancelHandler}
         purchaseContinued={this.purchaseContinueHander}
         />;
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
        return (
                <Aux>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                    </Modal>
                    <Burger  ingredients={this.state.ingredients}></Burger>
                     <BuildControls
                     ingredientRemoved={this.removeIngredientHandler} 
                     ingredientAdded={this.addIngredientHandler}
                     disabled= {disabledInfo}
                     price={this.state.totalPrice}
                     purchasable={this.state.purchasable}
                     ordered={this.purchaseHandler}
                     />  
                </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);