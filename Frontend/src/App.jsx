import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import AddTodo from "./components/AddTodo";
import AllTodos from "./components/AllTodos";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Bot as Brain } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [summary, setSummary] = useState("");
  const [open, setOpen] = useState(false);
  const [isCheckingBackend, setIsCheckingBackend] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const handleSummarize = async () => {
    const loadingToastId = toast.loading("Summarizing...");
    if (todos.length === 0) {
      toast.dismiss(loadingToastId);
      toast.error("No todos to summarize");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/summarize`);
      setSummary(res.data.summary);
      setOpen(true);
      toast.success("Summarized and sent to Slack");
    } catch (err) {
      console.log(err);
      toast.error("Failed to summarize");
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  const checkBackend = async () => {
    const loadingToastId = toast.loading("Checking backend...");
    setIsCheckingBackend(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/`);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      toast.dismiss(loadingToastId);
      setIsCheckingBackend(false);
    }
  };

  useEffect(() => {
    checkBackend();
    fetchTodos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Toaster position="top-center" />

      <h1 className="text-4xl font-bold text-center py-10">
        AI-Powered Todo Summarizer
      </h1>

      {isCheckingBackend && (
        <p className="text-sm text-muted-foreground mb-4">
          Checking backend status...
        </p>
      )}

      <div className="flex justify-center items-center">
        <AddTodo onAdd={fetchTodos} />
      </div>

      <div className="text-center">
        <Button
          className="my-2"
          onClick={handleSummarize}
          disabled={isCheckingBackend}
        >
          <Brain className="mr-2" />
          {isCheckingBackend ? "Please wait..." : "Summarize"}
        </Button>
      </div>

      <div className="p-5 rounded-lg shadow-md">
        <AllTodos todos={todos} refreshTodos={fetchTodos} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🧠 Todo Summary</DialogTitle>
            <DialogDescription className="whitespace-pre-line text-start">
              {summary || "No summary available"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
          {summary !== "" && (
            <p className="text-center text-xs text-muted-foreground">
              Copy of the summary has been sent to Slack
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;
