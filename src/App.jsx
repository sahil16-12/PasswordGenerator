/* eslint-disable react/prop-types */
import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [numberallowed, setNumberallowed] = useState(false);
  const [charallowed, setCharallowed] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);
  const passGen = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberallowed) str+="0123456789";
    if(charallowed) str+="/!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random()*str.length)];      
    }
    setPassword(pass);

  },[length,numberallowed,charallowed]);

  const copyToClipboard = () => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(()=>passGen(),[length,numberallowed,charallowed,passGen]);



  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8  text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center text-orange-500 my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
          value={password}
          className='ouline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passRef}
          />
          <button onClick = {copyToClipboard}className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={50}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
             />
             <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numberallowed}
            id="numberInput"
            onChange={() => {
              setNumberallowed(!numberallowed);
            }}
             />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={charallowed}
            id="charInput"
            onChange={() => {
              setCharallowed(!charallowed);
            }}
             />
            <label htmlFor='charInput'>Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
