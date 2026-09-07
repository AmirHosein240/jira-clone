export type ProjectStatus = "Planning" | "Active" | "Completed";

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  tasksCount: number;
}
