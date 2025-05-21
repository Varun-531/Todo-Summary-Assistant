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
