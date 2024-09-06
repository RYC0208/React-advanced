// // import React, { useEffect, useState } from "react";

// // const App = () => {
// //   const [message, setMessage] = useState("타이머 시작");

// //   useEffect(() => {
// //     const delay = function (ms) {
// //       const promise = new Promise((resolve) => {
// //         setTimeout(resolve, ms);
// //       });

// //       return promise;
// //     };

// //     delay(2000).then(function () {
// //       setMessage("2초 후 메세지가 변경되었씁니다.");
// //     });
// //   }, []);
// //   return (
// //     <div>
// //       <h1>{message}</h1>
// //     </div>
// //   );
// // };

// // export default App;

// import React, { useEffect } from "react";

// const App = () => {
//   useEffect(() => {
//     // fetch("https://jsonplaceholder.typicode.com/posts/1")
//     //   .then((response) => response.json())
//     //   .then((json) => console.log(json));
//     Promise.all([
//       fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
//         response.json()
//       ),
//       fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
//         response.json()
//       ),
//     ]);
//   }).then(function ([response1, response2]){
//     console.log("response=>1", response1)
//     console.log("response=>2", response2)
//   });
//   return <div></div>;
// };

// export default App;

import React, { useEffect, useState } from "react";

const App = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error =>", error);
      }
    };
    fetchPost();
  }, []);

  console.log("post", post);
  return (
    <div>
      <h3>async / await 연습</h3>
      {post ? <div>{post.title}</div> : <div>loading...</div>}
    </div>
  );
};

export default App;
