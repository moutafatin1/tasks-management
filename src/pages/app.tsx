import { Task } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { TaskList } from "../components";
import HeaderActions from "../components/HeaderActions";
import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/TaskModal";
import User from "../components/User";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { trpc } from "../utils/trpc";

export type ModalType = {
  isOpen: boolean;
  view: "create" | "update";
  task?: Task;
};

const AppPage = () => {
  // const [tasks, dispatch] = useReducer(reducer, data);
  const [isKanban, setIsKanban] = useState(false);
  const [openModal, setOpenModal] = useState<ModalType>({
    isOpen: false,
    view: "create",
  });
  const { data, error, status } = trpc.tasks.all.useQuery();
  if (error) {
    return <h1 className="text-red-500">{error.message}</h1>;
  }

  if (status !== "success") {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="h-screen  bg-slate-200">
      {/* Title */}

      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-10">
          <h1 className="text-center font-bold  text-6xl  text-gray-600">
            Tasks List
          </h1>
          <User />
        </div>
        <HeaderActions
          isKanban={isKanban}
          setIsKanban={setIsKanban}
          setOpenModal={setOpenModal}
          openModal={openModal.isOpen}
        />
        {openModal.isOpen && (
          <TaskModal
            view={openModal.view}
            setOpenModal={setOpenModal}
            taskToUpdate={openModal.task}
          />
        )}
        {!isKanban ? (
          <TaskList tasks={data.tasks} setOpenModal={setOpenModal} />
        ) : (
          <KanbanBoard tasks={data.tasks} />
        )}
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
