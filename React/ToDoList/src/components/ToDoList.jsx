import React, { useState, useEffect } from "react";
import "./ToDoList.css";

export default function ToDoList({ supabase, user }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTaskList();
  }, []);

  async function fetchTaskList() {
    try {
      setLoading(true);
      console.log("Current user:", user); // Check user object in console

      if (!user || !user.id) {
        console.error("User not available or missing ID");
        setError("User authentication issue. Please try logging in again.");
        setLoading(false);
        return;
      }

      // Log the query we're about to make
      console.log(`Fetching tasks for user ID: ${user.id}`);

      // Get the user's task array from the table
      // Make sure table name and column names match your database exactly
      const { data, error } = await supabase
        .from("tasks") // Verify this table name exists in your database
        .select("tasks")
        .eq("UID", user.id) // Verify this column name exists and matches case
        .single();

      console.log("Query result:", { data, error });

      if (error) {
        // If no record exists yet, create one with an empty array
        if (error.code === "PGRST116") {
          console.log("No tasks found, creating new entry");
          const { data: insertData, error: insertError } = await supabase
            .from("tasks")
            .insert({ UID: user.id, tasks: [] })
            .select(); // Add .select() to return the inserted data

          console.log("Insert result:", { insertData, insertError });

          if (insertError) throw insertError;

          setTasks([]);
        } else {
          throw error;
        }
      } else if (data) {
        console.log("Tasks loaded:", data.tasks);
        setTasks(data.tasks || []);
      }
    } catch (error) {
      console.error("Error in fetchTaskList:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTask(e) {
    e && e.preventDefault();
    if (newTask.trim() !== "") {
      try {
        // Create new task object
        const newTaskObj = {
          id: Date.now().toString(), // Simple unique ID
          content: newTask,
          completed: false,
        };

        // Add to local state first for immediate UI update
        const updatedTasks = [...tasks, newTaskObj];
        setTasks(updatedTasks);
        setNewTask("");

        // Update in database
        const { error } = await supabase
          .from("tasks")
          .update({ tasks: updatedTasks })
          .eq("UID", user.id);

        if (error) throw error;
      } catch (error) {
        setError(error.message);
      }
    }
  }

  async function deleteTask(index) {
    try {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);

      const { error } = await supabase
        .from("tasks")
        .update({ tasks: updatedTasks })
        .eq("UID", user.id);

      if (error) throw error;
    } catch (error) {
      setError(error.message);
    }
  }

  async function toggleTaskCompletion(index) {
    try {
      const updatedTasks = [...tasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        completed: !updatedTasks[index].completed,
      };
      setTasks(updatedTasks);

      const { error } = await supabase
        .from("tasks")
        .update({ tasks: updatedTasks })
        .eq("UID", user.id);

      if (error) throw error;
    } catch (error) {
      setError(error.message);
    }
  }

  async function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index - 1];
      updatedTasks[index - 1] = updatedTasks[index];
      updatedTasks[index] = temp;
      setTasks(updatedTasks);

      const { error } = await supabase
        .from("tasks")
        .update({ tasks: updatedTasks })
        .eq("UID", user.id);

      if (error) throw error;
    }
  }

  async function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index + 1];
      updatedTasks[index + 1] = updatedTasks[index];
      updatedTasks[index] = temp;
      setTasks(updatedTasks);

      const { error } = await supabase
        .from("tasks")
        .update({ tasks: updatedTasks })
        .eq("UID", user.id);

      if (error) throw error;
    }
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </form>

      {loading ? (
        <p>Loading your tasks...</p>
      ) : (
        <ol className="task-list">
          {tasks.map((task, index) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <span
                className="completion"
                onClick={() => toggleTaskCompletion(index)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.content}
              </span>
              <div className="task-controls">
                <button onClick={() => moveTaskUp(index)}>👆</button>
                <button onClick={() => moveTaskDown(index)}>👇</button>
                <button onClick={() => deleteTask(index)}>❌</button>
              </div>
            </li>
          ))}
        </ol>
      )}

      {!loading && tasks.length === 0 && (
        <p>No tasks yet. Add your first task above!</p>
      )}
    </div>
  );
}
