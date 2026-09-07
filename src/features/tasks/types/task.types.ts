export type TaskStatus = "Todo" | "In Progress" | "Done";

export type TaskPriority = "Low" | "Medium" | "High";

export type TaskStatusFilter = TaskStatus | "All";

export type TaskPriorityFilter = TaskPriority | "All";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}
