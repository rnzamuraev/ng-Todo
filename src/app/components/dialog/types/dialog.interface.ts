import { ICategory } from "src/app/shared/types/category.interface";
import { IPriority } from "src/app/shared/types/priority.interface";
import { ITask } from "src/app/shared/types/task.interface";

export interface IDialogData {
  task: ITask;
  category: ICategory;
  categories: ICategory[];
  priorities: IPriority[];
  title: string;
  message: string;
}
