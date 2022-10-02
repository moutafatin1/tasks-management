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

export type TaskAction = {
  actions: {
    toggleCompleted: (taskId: number, status: boolean) => void;
    deleteTask: (taskId: number) => void;
    openUpdateModal: (taskId: number) => void;
  };
};

export type ModalType = {
  isOpen: boolean;
  view: "create" | "update";
};

const AppPage = () => {
  const [openModal, setOpenModal] = useState<ModalType>({
    isOpen: false,
    view: "create",
  });
  const [taskText, setTaskText] = useState("");
  const [taskId, setTaskId] = useState(0);

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

  const addNewTask = () => {
    const newTask: TaskType = {
      id: Math.floor(Math.random() * 999),
      task: taskText,
      isCompleted: false,
      createdAt: `${formatAMPM(new Date())} ${new Date().toLocaleDateString()}`,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
    setOpenModal((prevValue) => ({ ...prevValue, isOpen: false }));
  };

  const updateTask = () => {
    const tasksUpdated = tasks.map((task) => {
      if (task.id === taskId) {
        task.task = taskText;
      }
      return task;
    });

    setTasks(tasksUpdated);

    setOpenModal({ isOpen: false, view: "create" });
  };

  const toggleCompleted = (taskId: number, status: boolean) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, isCompleted: !status };
      }
      return task;
    });

    setTasks(() => [...updatedTasks]);
  };
  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => [
      ...prevTasks.filter((task) => task.id !== taskId),
    ]);
    console.log("Deleted", taskId);
  };

  const openUpdateModal = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    setTaskText(task?.task);
    setTaskId(task.id);
    setOpenModal({ isOpen: true, view: "update" });
  };

  return (
    <main className="h-screen  bg-slate-200">
      {/* Title */}
      <div className="container px-4 mx-auto">
        <h1 className="text-center font-bold  text-6xl p-10 text-gray-600">
          Tasks List
        </h1>
        <HeaderActions
          setOpenModal={setOpenModal}
          openModal={openModal.isOpen}
        />
        {openModal.isOpen && (
          <TaskModal
            view={openModal.view}
            setOpenModal={setOpenModal}
            addNewTask={addNewTask}
            updateTask={updateTask}
            taskText={taskText}
            setTaskText={setTaskText}
          />
        )}
        <TaskList
          tasks={tasks}
          actions={{ toggleCompleted, deleteTask, openUpdateModal }}
        />
      </div>
    </main>
  );
};

export default AppPage;
