// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [message, setMessage] = useState("타이머 시작");

//   useEffect(() => {
//     const delay = function (ms) {
//       const promise = new Promise((resolve) => {
//         setTimeout(resolve, ms);
//       });

//       return promise;
//     };

//     delay(2000).then(function () {
//       setMessage("2초 후 메세지가 변경되었씁니다.");
//     });
//   }, []);
//   return (
//     <div>
//       <h1>{message}</h1>
//     </div>
//   );
// };

// export default App;

import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  });
  return <div></div>;
};

export default App;
