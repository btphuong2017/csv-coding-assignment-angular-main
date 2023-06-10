import { TaskStatus } from "@/enums/task";
import { User } from "./user";

export type Task = {
  id: number;
  name: string;
  description: string;
  assignee: User | null;
  status: TaskStatus;
};

export type TaskListParams = {
  name?: string;
  status?: TaskStatus;
  assignee?: number;
}