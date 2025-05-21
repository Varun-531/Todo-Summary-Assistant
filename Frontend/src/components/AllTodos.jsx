// import React, { useState, useEffect } from "react";
// import TodoItem from "./TodoItem";
// import axios from "axios";

// const AllTodos = ({ todos, refreshTodos }) => {
//   const [todos, setTodos] = useState([]);
//   useEffect(() => {
//     axios.get("http://localhost:5000/todos").then((res) => {
//       setTodos(res.data);
//     });
//   }, []);
//   return (
//     <div className="flex justify-center items-center flex-col gap-2">
//       {todos.map((todo) => (
//         <TodoItem key={todo.id} todo={todo} />
//       ))}
//     </div>
//   );
// };

// export default AllTodos;

import React from "react";
import TodoItem from "./TodoItem";

const AllTodos = ({ todos, refreshTodos }) => {
  return (
    <div className="flex justify-center items-center flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} refreshTodos={refreshTodos} />
      ))}
    </div>
  );
};

export default AllTodos;
