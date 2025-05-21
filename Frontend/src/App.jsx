import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import AddTodo from "./components/AddTodo";
import AllTodos from "./components/AllTodos";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-2">
        AI powered Todo Summarizer
        <div className="flex justify-center items-center">
          <AddTodo onAdd={fetchTodos} />
        </div>
        <Button className="my-2">Summarize</Button>
        <AllTodos todos={todos} refreshTodos={fetchTodos} />
      </h1>
    </div>
  );
};

export default App;
