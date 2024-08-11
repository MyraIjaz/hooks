// pure and impure functions:
// Pure function: has no side effect, return same output
// ==============
// Impure function: has side effects, invoke console.log, invoke fetch, 
// ================
// invoke geolocation functionality thats why create side effects 
// How to deal with side effects?
// By using Useeffect hook we can deal with side effects.

// pure function example:
// ======================

// function EstablishedYear(props){
// return(
//     <h1>{props.year}</h1>
// )
// }


// function App(){
//     return(
//         <EstablishedYear year={2023}/>
//     )
// }

// export default App;

// output is same because year is not gonna change it will stay same 


// impure function example:
// ========================

// function ShoppingCart(props){
//  const total = props.count * props.price
//  console.log(total)  //here ivoking console.log so it is impure making a broswer API call which is external not part of function
// return (
//     <h1>Total: {total}</h1>
// )} 

// function App(){
//     return(
//         <ShoppingCart 
//         count={10}
//         price={5}/>
//     )
// }

// export default App;

// here comes useeffect in picture

// function ShoppingCart(props){
//  const total = props.count * props.price
//  useEffect(()=>console.log(total),[])
// return (
//     <h1>Total: {total}</h1>
// )} 

// function App(){
//     return(
//         <ShoppingCart 
//         count={10}
//         price={5}/>
//     )
// }

// export default App;

// correct usage of the dependency array and the different useEffect calls 
// that can be used to separate different concerns. You will also learn how
//  you can clean up resources and free up memory in your useEffect logic by returning a function.
// The code you place inside the useEffect hook always runs after your component
//  mounts or, in other words, after React has updated the DOM.

// In addition, depending on your configuration via the dependencies array,
//  your effects can also run when certain state variables or props change. 

// By default, if no second argument is provided to the useEffect function, the effect will run after every render.

// In the below example, the integer variable version is passed as the second parameter. That means that
//  the effect will only be re-run if the version number changes between renders.

useEffect(() => { 
    document.title = `Little Lemon, v${version}`;
  }, [version]); // Only re-run the effect if version changes 


//   If version is 2 and the component re-renders and version still equals 2, React will compare [2] from the 
// previous render and [2] from the next render. Since all items inside the array are the same, React would skip running the effect.

// Use multiple Effects to Separate Concerns
// ===========================================

// React doesn’t limit you in the number of effects your component can have. In fact, it encourages you to group
//  related logic together in the same effect and break up unrelated logic into different effects.

function MenuPage(props) { 
    const [data, setData] = useState([]); 
  
    useEffect(() => { 
      document.title = 'Little Lemon'; 
    }, []); 
  
    useEffect(() => { 
      fetch(`https://littlelemon/menu/${id}`) 
        .then(response => response.json()) 
        .then(json => setData(json)); 
    }, [props.id]); 
  
    // ... 
  } 

//   Multiple hooks allow you to split the code based on what it is doing, improving code readability and modularity.

// Effects with Cleanup
// =====================


// Some side effects may need to clean up resources or memory that is not required anymore,
//  avoiding any memory leaks that could slow down your applications.

// For example, you may want to set up a subscription to an external data source. 
// In that scenario, it is vital to perform a cleanup after the effect finishes its execution.

// How can you achieve that? In line with the previous point of splitting the 
// code based on what it is doing, the useEffect hook has been designed to keep the code for adding 
// and removing a subscription together, since it’s tightly related. 

function LittleLemonChat(props) { 
    const [status, setStatus] = useState('offline'); 
  
    useEffect(() => { 
      LemonChat.subscribeToMessages(props.chatId, () => setStatus('online')) 
  
      return () => { 
        setStatus('offline'); 
        LemonChat.unsubscribeFromMessages(props.chatId); 
      }; 
    }, []); 
  
    // ... 
  } 

//   Returning a function is optional and it’s the mechanism React provides in case you need 
// to perform additional cleanup in your components.

// React will make sure to run the cleanup logic when it’s needed. The execution will always
//  happen when the component unmounts. However, in effects that run after every render and not 
// just once, React will also clean up the effect from the previous render before running the new effect next time.


// Updating a Browser tab is an example of a side effect

import {useEffect,useState} from "react"
function App(){
    const[toggle,setToggle]=useState(false)
    function clickHandler(){
        setToggle(!toggle)
    }
  useEffect(()=>{
    document.title=toggle ? "Welcome to Little Lemon":"Using Use Effect hook"
  },[toggle])
    return(
        <>
        <h1>UseEffect Hook</h1> 
        <button onClick={clickHandler}>Update</button>
       {toggle && <h2>Hello Welcome to little lemon</h2>}
        </>

    )
}

export default App

// If your effect returns a function, React will run it when it’s time to clean up resources and free unused memory.


// another example:
// =================

// import { useState, useEffect } from "react"; 
 
// export default function App() { 
//   const [btcData, setBtcData] = useState({}); 
//   useEffect(() => { 
//     fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`) 
//       .then((response) => response.json()) 
//       .then((jsonData) => setBtcData(jsonData.bpi.USD)) 
//       .catch((error) => console.log(error)); 
//   }, []); 
 
//   return ( 
//     <> 
//       <h1>Current BTC/USD data</h1> 
//       <p>Code: {btcData.code}</p> 
//       <p>Symbol: {btcData.symbol}</p> 
//       <p>Rate: {btcData.rate}</p> 
//       <p>Description: {btcData.description}</p> 
//       <p>Rate Float: {btcData.rate_float}</p> 
//     </> 
//   ); 
// } 

// above example can be handle this way too:
// ===========================================


// import { useState, useEffect } from "react"; 
 
// export default function App() { 
//   const [btcData, setBtcData] = useState({}); 
//   useEffect(() => { 
//     fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`) 
//       .then((response) => response.json()) 
//       .then((jsonData) => setBtcData(jsonData.bpi.USD)) 
//       .catch((error) => console.log(error)); 
//   }; 
 
//   useEffect(() => { 
//     fetchData(); 
//   }, []); 
 
//   return ( 
//     <> 
//       <h1>Current BTC/USD data</h1> 
//       <p>Code: {btcData.code}</p> 
//       <p>Symbol: {btcData.symbol}</p> 
//       <p>Rate: {btcData.rate}</p> 
//       <p>Description: {btcData.description}</p> 
//       <p>Rate Float: {btcData.rate_float}</p> 
//     </> 
//   ); 
// } 


// One additional thing that can be discussed here is the return statement of the above example.

// Very often, the response from fetching third-party data might fail, or be delayed. 
// That's why it can be useful to provide different renders, based on whether or not
//  the data has been received.

// The simplest conditional rendering might involve setting up two renders, based 
// on whether or not the data has been successfully fetched.

// For example:

// return someStateVariable.length > 0 ? ( 
//   <div> 
//     <h1>Data returned:</h1> 
//     <h2>{someStateVariable.results[0].price}</h2> 
//   </div> 
// ) : ( 
//   <h1>Data pending...</h1> 
// ); 

// In this example, I'm conditionally returning an h1 and h2, if the length
//  of the someStateVariable binding's length is longer than 0.

// This approach would work if the someStateVariable holds an array.

// If the someStateVariable is initialized as an empty array, passed to 
// the call to the useState hook, then it would be possible to update this 
// state variable with an array item that might get returned from a fetch() 
// call to a third-party JSON data provider.

// If this works out as described above, the length of the someStateVariable
//  would increase from the starting length of zero - because an empty array's length is zero.

// Let's inspect the conditional return again:
// return someStateVariable.length > 0 ? ( 
//   <div> 
//     <h1>Data returned:</h1> 
//     <h2>{someStateVariable.results[0].price}</h2> 
//   </div> 
// ) : ( 
//   <h1>Data pending...</h1> 
// ); 
// If the data fetching fails, the text of "Data pending..." will render on 
// the screen, since the length
//  of the someStateVariable will remain being zero




// Fetching data:
// =======================
// =========================

// import {useEffect,useState} from "react"
// function App(){
//     const[user,setUser] = useState([])
//     console.log(user)
//    const fetchData =()=>{
//     fetch ("https://randomuser.me/api/?results=10")
//     .then(response=>response.json())
//     .then(data=>setUser(data))
    
//    }
  
//    useEffect(()=>{
//     fetchData()
//    },[])
//     return Object.keys(user).length > 0 ?(
//       <>
//       {user.results[0].name.first}
//       </>
//     ):(<h1>Data pending.....</h1>)
// }

// export default App