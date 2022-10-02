import { useState } from "react";
import { TaskList } from "../components";
import HeaderActions from "../components/HeaderActions";
import TaskModal from "../components/TaskModal";
import { formatAMPM } from "../utils";

const tasks: TaskType[] = [
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

export type TaskType = {
  id: number;
  task: string;
  isCompleted: boolean;
  createdAt: string;
};

const AppPage = () => {
  const [openModal, setOpenModal] = useState(true);
  return (
    <main className="h-screen  bg-slate-200">
      {/* Title */}
      <div className="container px-4 mx-auto">
        <h1 className="text-center font-bold  text-6xl p-10 text-gray-600">
          Tasks List
        </h1>
        <HeaderActions setOpenModal={setOpenModal} openModal={openModal} />
        {openModal && <TaskModal setOpenModal={setOpenModal} />}
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
};

export default AppPage;
