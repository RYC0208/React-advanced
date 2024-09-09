import React from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

const Main = () => {
  const queryClient = useQueryClient();
  const [todoItem, setTodoItem] = useState("");
  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:4000/todos");
    return response.data;
  };

  const addTodo = async (newTodo) => {
    await axios.post("http://localhost:4000/todos", newTodo);
  };

  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select: (todos) => {
      return todos.map((todo) => {
        return { ...todo, test: 1 };
      });
    },
  });
  // mutation말고 구조 분해할당으로도 가능
  const { mutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // alert("데이터 삽입 성공");
      queryClient.invalidateQueries(["todos"]);
    },
  });

  if (isPending) {
    return <div>로딩중입니다..</div>;
  }

  if (isError) {
    return <div>데이터 조회중 오류가 발생했음</div>;
  }
  console.log(todos);

  return (
    <div>
      <h3>TanStack Query</h3>
      <Link to="/empty">
        <button>Empty 이동</button>
      </Link>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const newTodoObj = { title: todoItem, isDone: false };
          //useMutation 로직 작성하면 됨
          mutate(newTodoObj);
        }}
      >
        <input
          type="text"
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
        />
        <button>추가</button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "red",
              }}
            >
              <h4>{todo.title}</h4>
              <p>{todo.isDone ? "Done" : "Not Done"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Main;
