import { useState } from "react";
import { TaskList } from "../components";
import HeaderActions from "../components/HeaderActions";
import TaskModal from "../components/TaskModal";
import { formatAMPM } from "../utils";

export type TaskType = {
  id: number;
  task: string;
  isCompleted: boolean;
  createdAt: string;
};

const AppPage = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
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
  ]);
  const [openModal, setOpenModal] = useState(true);

  const addNewTask = (task: string) => {
    const newTask: TaskType = {
      id: Math.floor(Math.random() * 999),
      task,
      isCompleted: false,
      createdAt: `${formatAMPM(new Date())} ${new Date().toLocaleDateString()}`,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  return (
    <main className="h-screen  bg-slate-200">
      {/* Title */}
      <div className="container px-4 mx-auto">
        <h1 className="text-center font-bold  text-6xl p-10 text-gray-600">
          Tasks List
        </h1>
        <HeaderActions setOpenModal={setOpenModal} openModal={openModal} />
        {openModal && (
          <TaskModal setOpenModal={setOpenModal} addNewTask={addNewTask} />
        )}
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
};

export default AppPage;
