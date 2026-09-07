import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../api/project.service";

import type { Project } from "../types/project.types";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,

    onSuccess: (newProject) => {
      queryClient.setQueryData(
        ["projects"],
        (oldProjects: Project[] | undefined) => {
          if (!oldProjects) {
            return [newProject];
          }

          return [newProject, ...oldProjects];
        },
      );
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      project,
    }: {
      projectId: number;
      project: Omit<Project, "id" | "tasksCount">;
    }) => updateProject(projectId, project),

    onSuccess: (updatedProject) => {
      queryClient.setQueryData(
        ["projects"],
        (oldProjects: Project[] | undefined) => {
          if (!oldProjects) {
            return [updatedProject];
          }

          return oldProjects.map((project) =>
            project.id === updatedProject.id ? updatedProject : project,
          );
        },
      );
    },
  });
}
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,

    onSuccess: (_, deletedProjectId) => {
      queryClient.setQueryData(
        ["projects"],
        (oldProjects: Project[] | undefined) => {
          if (!oldProjects) {
            return [];
          }

          return oldProjects.filter(
            (project) => project.id !== deletedProjectId,
          );
        },
      );
    },
  });
}
