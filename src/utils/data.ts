import { TaskType } from "../pages/app";
import { formatAMPM } from "./date";

export const data: TaskType[] = [
  {
    id: 1,
    task: "This is the first task",
    isCompleted: true,
    createdAt: `${formatAMPM(new Date())} ${new Date().toLocaleDateString()}`,
  },
  {
    id: 2,
    task: "This is the second task",
    isCompleted: false,
    createdAt: `${formatAMPM(new Date())} ${new Date().toLocaleDateString()}`,
  },
];

export enum ActionKind {
  ADD = "ADD",
  DELETE = "DELETE",
  TOGGLE_COMPLETED = "TOGGLE_COMPLETED",
  UPDATE = "UPDATE",
}

export type Action = {
  type: ActionKind;
  payload: {
    task?: string;
    id?: number;
    status?: boolean;
  };
};

// const addNewTask = () => {

//     setTasks((previousTasks) => [...previousTasks, newTask]);
//     setOpenModal((prevValue) => ({ ...prevValue, isOpen: false }));
// };

export function reducer(
  state: TaskType[],
  { payload: { task = "", id = 0, status = false }, type }: Action
) {
  switch (type) {
    case ActionKind.ADD:
      const newTask: TaskType = {
        id: Math.floor(Math.random() * 999),
        task: task,
        isCompleted: false,
        createdAt: `${formatAMPM(
          new Date()
        )} ${new Date().toLocaleDateString()}`,
      };
      return [...state, newTask];
    case ActionKind.DELETE:
      return [...state.filter((task) => task.id !== id)];

    case ActionKind.TOGGLE_COMPLETED:
      return state.map((task) => {
        if (task.id === id) {
          task.isCompleted = status;
          console.log(
            "🚀 ~ file: data.ts ~ line 61 ~ updatedState ~ task",
            task
          );
        }
        return task;
      });
    case ActionKind.UPDATE:
      const updatedTasks = state.map((t) => {
        if (t.id === id && task) {
          t.task = task;
        }
        return t;
      });
      return updatedTasks;
    default:
      return state;
  }
}
