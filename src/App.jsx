/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setNumberAllowed] = useState(false);
  const [charallow, setCharAllow] = useState(false);
  const [password, setpassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  //use ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) string += "0123456789";
    if (charallow) string += "!@#$%^&*()_+-={}[]|:;";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);

    }

    setpassword(pass)
  }, [length, numberallowed, charallow, setpassword ]);

  const copytoclipboard =useCallback(()=>
    {
      passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
    setCopySuccess(true); // Indicate success
    setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    }, [password])

  useEffect(()=>{passwordGenerator()}, [length, charallow, numberallowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 bg-gray-600">
        <h1>Password Generator</h1>
        <div className="flex shadow-rounded-lg overflow-hidden mb:4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 my-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copytoclipboard}
            className={`outline-none py-1 px-3 my-3 transition-all 
          ${
            copySuccess ? "bg-green-600 text-white" : "bg-blue-700 text-red-600"
          }`}
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex text-sm gap-x-2 ">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100} // we must use 24 characters good practice
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallow}
              id="charInput"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
