import type { Task } from "../types/task.types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../api/task.service";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,

    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks: Task[] | undefined) => {
        if (!oldTasks) {
          return [newTask];
        }

        return [newTask, ...oldTasks];
      });
    },
  });
}
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onSuccess: (_, deletedTaskId) => {
      queryClient.setQueryData(["tasks"], (oldTasks: Task[] | undefined) => {
        if (!oldTasks) {
          return [];
        }

        return oldTasks.filter((task) => task.id !== deletedTaskId);
      });
    },
  });
}
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      task,
    }: {
      taskId: number;
      task: Omit<Task, "id">;
    }) => updateTask(taskId, task),

    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks: Task[] | undefined) => {
        if (!oldTasks) {
          return [updatedTask];
        }

        return oldTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        );
      });
    },
  });
}
