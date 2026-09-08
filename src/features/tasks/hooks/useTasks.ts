import type { Task } from "../types/task.types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../api/task.service";

const TASKS_QUERY_KEY = ["tasks"];

export function useTasks() {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: getTasks,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,

    onSuccess: (newTask) => {
      queryClient.setQueryData(
        TASKS_QUERY_KEY,
        (oldTasks: Task[] | undefined) => {
          if (!oldTasks) {
            return [newTask];
          }

          return [newTask, ...oldTasks];
        },
      );
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: number) => {
      const tasks = queryClient.getQueryData<Task[]>(TASKS_QUERY_KEY) ?? [];

      const taskExists = tasks.some((task) => task.id === taskId);

      if (taskExists && taskId > 1_000_000_000_000) {
        return taskId;
      }

      await deleteTask(taskId);

      return taskId;
    },

    onSuccess: (deletedTaskId) => {
      queryClient.setQueryData(
        TASKS_QUERY_KEY,
        (oldTasks: Task[] | undefined) => {
          if (!oldTasks) {
            return [];
          }

          return oldTasks.filter((task) => task.id !== deletedTaskId);
        },
      );
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      task,
    }: {
      taskId: number;
      task: Omit<Task, "id">;
    }) => {
      const tasks = queryClient.getQueryData<Task[]>(TASKS_QUERY_KEY) ?? [];

      const existingTask = tasks.find((item) => item.id === taskId);

      if (existingTask && taskId > 1_000_000_000_000) {
        return {
          id: taskId,
          ...task,
        };
      }

      return updateTask(taskId, task);
    },

    onSuccess: (updatedTask) => {
      queryClient.setQueryData(
        TASKS_QUERY_KEY,
        (oldTasks: Task[] | undefined) => {
          if (!oldTasks) {
            return [updatedTask];
          }

          return oldTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task,
          );
        },
      );
    },
  });
}
