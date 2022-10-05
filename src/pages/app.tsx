import { GetServerSideProps } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useReducer, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
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

  const firstName = () => {
    if (session?.user?.name) {
      return session.user.name.split(" ")[0];
    }
    return "";
  };

  const lastName = () => {
    if (session?.user?.name) {
      return session.user.name.split(" ")[1];
    }
    return "";
  };

  return (
    <main className="h-screen  bg-slate-200">
      {/* Title */}

      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-10">
          <h1 className="text-center font-bold  text-6xl  text-gray-600">
            Tasks List
          </h1>
          <div className="flex items-center">
            <div className="flex flex-col items-center border-r border-gray-400 pr-3 ">
              <div className="relative h-20 w-20 ">
                <Image
                  className="absolute rounded-full"
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? "user"}
                  layout="fill"
                />
              </div>
              <div className="flex flex-col items-center font-bold text-gray-600">
                <span>{firstName()}</span>
                <span>{lastName()}</span>
              </div>
            </div>
            {/* Logout  */}
            <button onClick={() => signOut()} className=" rounded-md mx-2">
              <HiOutlineLogout className="text-3xl transition-colors hover:text-red-500" />
            </button>
          </div>
        </div>
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
