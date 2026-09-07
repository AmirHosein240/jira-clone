import type { Task } from "../types/task.types";

interface ApiTodo {
  id: number;
  title: string;
  completed: boolean;
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=6",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data: ApiTodo[] = await response.json();

  return data.map((todo) => ({
    id: todo.id,
    title: todo.title,
    status: todo.completed ? "Done" : "Todo",
    priority: todo.id % 3 === 0 ? "High" : todo.id % 2 === 0 ? "Medium" : "Low",
  }));
}
export async function createTask(task: Omit<Task, "id">): Promise<Task> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task.title,
      completed: task.status === "Done",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  const data: {
    id: number;
    title: string;
    completed: boolean;
  } = await response.json();

  return {
    id: data.id,
    title: data.title,
    status: task.status,
    priority: task.priority,
  };
}
export async function deleteTask(taskId: number): Promise<void> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${taskId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}
export async function updateTask(
  taskId: number,
  task: Omit<Task, "id">,
): Promise<Task> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        completed: task.status === "Done",
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  const data: {
    id: number;
    title: string;
    completed: boolean;
  } = await response.json();

  return {
    id: data.id,
    title: data.title,
    status: task.status,
    priority: task.priority,
  };
}
