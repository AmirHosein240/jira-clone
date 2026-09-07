import type { Project } from "../types/project.types";

interface ApiPost {
  id: number;
  title: string;
  body: string;
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=6",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data: ApiPost[] = await response.json();

  return data.map((post) => ({
    id: post.id,
    name: post.title,
    description: post.body,
    status:
      post.id % 3 === 0
        ? "Completed"
        : post.id % 2 === 0
          ? "Active"
          : "Planning",
    tasksCount: post.id * 2,
  }));
}

export async function createProject(
  project: Omit<Project, "id" | "tasksCount">,
): Promise<Project> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: project.name,
      body: project.description,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  const data: ApiPost = await response.json();

  return {
    id: data.id,
    name: project.name,
    description: project.description,
    status: project.status,
    tasksCount: 0,
  };
}

export async function updateProject(
  projectId: number,
  project: Omit<Project, "id" | "tasksCount">,
): Promise<Project> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${projectId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: project.name,
        body: project.description,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  const data: ApiPost = await response.json();

  return {
    id: data.id,
    name: project.name,
    description: project.description,
    status: project.status,
    tasksCount: 0,
  };
}
export async function deleteProject(projectId: number): Promise<void> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${projectId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }
}
