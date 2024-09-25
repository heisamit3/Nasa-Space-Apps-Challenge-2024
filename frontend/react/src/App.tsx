import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from ".././components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="react logo" />
        <img src={viteLogo} className="App-logo" alt="vite logo" />
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <Button
            label="Increment"
            onClick={() => setCount((count) => count + 1)}
          />
          <Button
            label="Decrement"
            onClick={() => setCount((count) => count - 1)}
          />
        </p>
        <p>
          <code>count: {count}</code>
        </p>
      </header>
    </div>
  );
}

export default App;
