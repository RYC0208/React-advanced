import React from "react";
import useBearsStore from "./zustand/bearsStore";

const App = () => {
  const { bears, increase, init } = useBearsStore((state) => state);
  return (
    <div>
      <h2>Zustand</h2>
      <h4>{bears}</h4>
      <button onClick={increase}>+1</button>
      <button onClick={init}>초기화</button>
    </div>
  );
};

export default App;
