import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { Check, Pencil, Trash2 } from "lucide-react";

const TodoItem = ({ todo, refreshTodos }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [inputValue, setInputValue] = useState(todo.text);
  const [completed, setCompleted] = useState(todo.status === "completed");

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${todo.id}`);
      toast.success("Todo deleted successfully");
      refreshTodos();
    } catch (error) {
      toast.error("Failed to delete todo", error);
    }
  };

  const handleDone = async () => {
    try {
      await axios.put(`${API_BASE_URL}/todos/${todo.id}/status`);
      setCompleted(true);
      toast.success("Todo updated successfully");
      refreshTodos();
    } catch (error) {
      toast.error("Failed to update todo", error);
    }
  };

  const handleEdit = async () => {
    if (!inputValue.trim()) {
      toast.error("Todo cannot be empty");
      setInputValue(todo.text);
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/todos/${todo.id}`, {
        text: inputValue,
      });
      toast.success("Todo updated successfully");
      refreshTodos();
    } catch (error) {
      toast.error("Failed to update todo", error);
    }
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`min-w-[200px] ${completed ? "line-through" : ""}`}
        disabled={completed}
      />
      <Button
        onClick={handleEdit}
        disabled={completed || inputValue === todo.text || !inputValue.trim()}
      >
        <Pencil /> Edit
      </Button>
      {completed ? (
        <Button onClick={handleDelete}>
          <Trash2 />
          Delete
        </Button>
      ) : (
        <Button onClick={handleDone}>
          <Check /> Done
        </Button>
      )}
    </div>
  );
};

export default TodoItem;
