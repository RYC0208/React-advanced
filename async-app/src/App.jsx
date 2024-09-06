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

import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState({
    title: "",
  });
  const [targetId, setTargetId] = useState("");
  const [editTodo, setEditTodo] = useState({
    title: "",
  });
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/todos");
        // const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error =>", error);
      }
    };
    fetchPost();
  }, []);

  console.log("todos", todos);

  const onSubmitHandler = async (todo) => {
    const { data } = await axios.post("http://localhost:4000/todos", todo);

    setTodos([...todos, data]);
  };

  const onDeleteHandler = async (id) => {
    await axios.delete("http://localhost:4000/todos/" + id);

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onEditHandler = async (targetId, editTodo) => {
    await axios.patch("http://localhost:4000/todos/" + targetId, editTodo);

    const newTodos = todos.map((todo) => {
      if (todo.id === targetId) {
        return {
          ...todo,
          title: editTodo.title,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };
  return (
    <div>
      <h3>axios 연습</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="수정하고 싶은 Todo Id 입력"
            onChange={(e) => {
              setTargetId(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="수정할 값 입력"
            onChange={(e) => {
              setEditTodo({ ...editTodo, title: e.target.value });
            }}
          />
          <button
            type="button"
            onClick={() => onEditHandler(targetId, editTodo)}
          >
            수정
          </button>
        </div>

        <input
          type="text"
          onChange={(e) => {
            setTodo({ ...todo, title: e.target.value });
          }}
        />
        <button type="submit">추가하기</button>
      </form>
      {todos?.map((todo) => {
        return (
          <div key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => onDeleteHandler(todo.id)}>삭제</button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
