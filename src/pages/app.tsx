import { useReducer, useState } from "react";
import { TaskList } from "../components";
import HeaderActions from "../components/HeaderActions";
import TaskModal from "../components/TaskModal";
import { data, reducer } from "../utils";

export type TaskType = {
  id: number;
  task: string;
  isCompleted: boolean;
  createdAt: string;
};

export type ModalType = {
  isOpen: boolean;
  view: "create" | "update";
  task?: TaskType;
};

const AppPage = () => {
  const [tasks, dispatch] = useReducer(reducer, data);
  const [openModal, setOpenModal] = useState<ModalType>({
    isOpen: false,
    view: "create",
  });

  // const updateTask = () => {
  //   const tasksUpdated = tasks.map((task) => {
  //     if (task.id === taskId) {
  //       task.task = taskText;
  //     }
  //     return task;
  //   });

  //   setTasks(tasksUpdated);

  //   setOpenModal({ isOpen: false, view: "create" });
  // };

  // const toggleCompleted = (taskId: number, status: boolean) => {
  //   const updatedTasks = tasks.map((task) => {
  //     if (task.id == taskId) {
  //       return { ...task, isCompleted: !status };
  //     }
  //     return task;
  //   });

  //   setTasks(() => [...updatedTasks]);
  // };
  // const deleteTask = (taskId: number) => {
  //   setTasks((prevTasks) => [
  //     ...prevTasks.filter((task) => task.id !== taskId),
  //   ]);
  //   console.log("Deleted", taskId);
  // };

  // const openUpdateModal = (taskId: number) => {
  //   const task = tasks.find((task) => task.id === taskId);
  //   if (!task) {
  //     throw new Error("Task not found");
  //   }
  //   setTaskText(task?.task);
  //   setTaskId(task.id);
  //   setOpenModal({ isOpen: true, view: "update" });
  // };

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
            dispatch={dispatch}
            taskToUpdate={openModal.task}
          />
        )}
        <TaskList tasks={tasks} dispatch={dispatch} setOpenModal={setOpenModal} />
      </div>
    </main>
  );
};

export default AppPage;
