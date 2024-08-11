// While both manage information, `useState` is ideal for everyday simplicity,
// resembling a sticky note, while `useReducer` shines in intricate scenarios,
// handling simultaneous complex tasks. The choice between them depends on 
// the nature of your website's needs and the level of complexity involved.

import { useReducer } from "react";

// Code and Info here:
// =====================
// ======================

// For the sake of simplicity, I've only added two actions. Buy ingredients and sell meals.
// The reducer function takes in the previous state and an action and returns the new state.
// The action type determines the specific action of the reducer. Actions can have any form. 
// By convention, it's common to pass objects with a type property identifying the action.
// You should include the minimal necessary information that the reducer needs to compute
// the next state. You can find out more about extracting state logic into a reducer in the
// additional readings at the end of this lesson. Instead of using setState like the useState hook,
// you use the dispatch method of the useReducer hook. This accepts an object literal with a single 
// property called type set to a matching action datatype whose behavior is defined inside the reducer
// function. As I'm already serving this app in the browser. Let me demonstrate how it works.
// When I press the shopping for veggies button, the amount in the wallet decreases by ten. 
// When I press the server meal to the customer, the amount in the wallet increases by ten. 
// With useReducer, you can define more types as many as you need. This way, you can easily work
// with more complex logic in your React apps. Something that might be too difficult to rationalize
// when using useState. To explore this in practice, let's add another action type.
// I'll name it celebrity visit. This action should be triggered when a celebrity visits the restaurant, 
// which brings in $5,000 to the restaurant when it happens. To make this work, I've added another
// action type to the reducer function, and then another button to trigger it.
// I'll save my changes and preview the updated app in the browser. There. It's all working as intended.
// Clicking the celebrity visit button increases the wallet amount by 5,000 and it's as simple as that.

const reducer =(state,action)=>{
    if(action.type==="buy_ingredients")return {money:state.money-10}
    if(action.type==="sell_meal")return {money:state.money+10}
}
export default function App(){
    const initialState = {money:100}
    const[state,dispatch]=useReducer(reducer, initialState)
    return (
        <div>
        <h1>Wallet:{state.money}</h1>
        <button onClick={()=>dispatch({type:"buy_ingredients"})}>Shopping for veggies </button>
        <button onClick={()=>dispatch({type:"sell_meal"})}>Serve a meal</button>
        </div>
    )
}















// When to choose useState and useReducer:
// ==============================================
// =============================================

// There's no clear-cut point on this spectrum, at which point you would decide: 
// "If my state object has three or more properties, I'll use the useReducer hook".

// Sometimes such a statement might make sense, and other times it might not.

// What's important to remember is to keep your code simple to understand, collaborate on, 
// contribute to, and build from.

// One negative characteristic of useState is that it often gets hard to maintain as
// the state gets more complex.

// On the flip side, a negative characteristic of useReducer is that it requires more 
// prep work to begin with. There's more setup involved. However, once this setup is completed,
// it gets easier to extend the code based on new requirements.