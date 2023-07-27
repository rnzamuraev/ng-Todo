import { ICategory } from "./category.interface";
import { IPriority } from "./priority.interface";

export interface ITask {
  id: number;
  name: string;
  status: boolean;
  priority: IPriority | null;
  category: ICategory | null;
  date: Date | null;
}
