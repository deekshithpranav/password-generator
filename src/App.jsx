import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const generatePassword = useCallback(() => {
    let str = "";
    let tokens = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) tokens += "1234567890";
    if (charAllowed) tokens += "!@#$%^&*()_=+-;:";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * tokens.length + 1);
      str += tokens.charAt(index);
    }
    setPassword(str);
  }, [numAllowed, charAllowed, length]);

  function copyPassword() {
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  }

  useEffect(() => generatePassword(), [length, charAllowed, numAllowed]);

  return (
    <div className=" bg-zinc-500 w-full max-w-lg mx-auto shadow-md rounded-md px-3 py-3 my-8 text-blue-600">
      <h1 className="text-white text-center my-3 font-bold text-2xl mb-10">
        Password Generator
      </h1>
      <div className="flex shadow rounded-md overflow-hidden mb-4 mx-6">
        <input
          className="outline-none w-full py-1 px-3 text-slate-600 font-semibold"
          type="text"
          readOnly
          placeholder="Password"
          value={password}
          ref={passRef}
        />
        <button
          className="outline-none font-semibold bg-blue-500 text-white px-4 py-0.5 shrink-0"
          onClick={copyPassword}
        >
          copy
        </button>
      </div>
      <div className="flex text-[14.8px] mt-10 pb-4 font-bold text-white">
        <div className="flex items-center gap-x-4">
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer"
          />
          <p>Length: {length}</p>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name="numbers"
              defaultChecked={numAllowed}
              onClick={() => setNumAllowed((val) => !val)}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onClick={() => setCharAllowed((val) => !val)}
            />
            <label htmlFor="char">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
