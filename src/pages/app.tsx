import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useReducer, useState } from "react";
import { TaskList } from "../components";
import HeaderActions from "../components/HeaderActions";
import TaskModal from "../components/TaskModal";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
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

  const { data: session } = useSession();
  console.log("🚀 ~ file: app.tsx ~ line 29 ~ AppPage ~ session", session);

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
        <TaskList
          tasks={tasks}
          dispatch={dispatch}
          setOpenModal={setOpenModal}
        />
      </div>
    </main>
  );
};

export default AppPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
