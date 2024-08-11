import { useRef } from "react"

// useRef to access underlying DOM

export default function App(){
  const formInputRef=useRef(null)
  
  function inputFocus (){
      formInputRef.current.focus()
  }

  return(
      <>
      <input ref={formInputRef} type="text"/>
      <button onClick={inputFocus}>
Focus
      </button>
      </>
  )
}
 

