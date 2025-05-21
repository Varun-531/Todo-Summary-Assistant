import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
const AddTodo = ({ onAdd }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [todo, setTodo] = useState("");
  const handleAdd = async () => {
    if (!todo.trim()) {
      toast.error("Todo cannot be empty");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/todos`, { text: todo });
      toast.success("Todo added successfully");
      setTodo("");
      onAdd();
    } catch (error) {
      toast.error("Failed to add todo", error);
    }
  };
  return (
    <div className="flex justify-center items-center gap-2 py-2">
      <Input
        type="text"
        placeholder="Add Todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Button onClick={handleAdd}>Add</Button>
    </div>
  );
};

export default AddTodo;
