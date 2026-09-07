import type { User, UserRole, UserStatus } from "../types/user.types";

interface ApiUser {
  id: number;
  name: string;
  email: string;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: ApiUser[] = await response.json();

  return data.map((user) => {
    const role: UserRole =
      user.id === 1 ? "Admin" : user.id <= 3 ? "Manager" : "Member";

    const status: UserStatus = user.id % 2 === 0 ? "Active" : "Inactive";

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role,
      status,
    };
  });
}
