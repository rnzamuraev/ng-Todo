import { ICategory } from "../shared/types/category.interface";
import { IPriority } from "../shared/types/priority.interface";
import { ITask } from "../shared/types/task.interface";

export class Data {
  static categories: ICategory[] = [
    { id: 1, name: "All" },
    { id: 2, name: "Sport" },
    { id: 3, name: "Study" },
    { id: 4, name: "Food" },
    { id: 5, name: "Car" },
  ];

  static priorities: IPriority[] = [
    // { id: 1, name: "little", color: "#e5e5e5" },
    { id: 1, name: "little", color: "#eeff66" },
    { id: 2, name: "average", color: "#44cc66" },
    { id: 3, name: "high", color: "#ff55bb" },
    { id: 4, name: "very high", color: "#ff3344" },
  ];

  static task: ITask[] = [
    {
      id: 1,
      name: "run 5 kilometers",
      category: Data.categories[1],
      status: false,
      priority: Data.priorities[1],
      date: new Date("202-0-27"),
    },
    {
      id: 2,
      name: "learn English",
      category: Data.categories[2],
      status: false,
      priority: Data.priorities[3],
      date: new Date("2023-07-27"),
    },
    {
      id: 3,
      name: "buy fruits",
      category: Data.categories[3],
      status: false,
      priority: Data.priorities[0],
      date: null,
    },
    {
      id: 4,
      name: "cook dinner",
      category: Data.categories[3],
      status: true,
      priority: Data.priorities[3],
      date: new Date("2023-07-27"),
    },
    {
      id: 5,
      name: "To wash a car",
      category: Data.categories[4],
      status: false,
      priority: Data.priorities[0],
      date: new Date("2023-07-27"),
    },
    {
      id: 6,
      name: "change oil",
      category: Data.categories[4],
      status: false,
      priority: Data.priorities[2],
      date: new Date("2023-07-27"),
    },
  ];
}
