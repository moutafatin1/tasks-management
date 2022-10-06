import { Task } from "@prisma/client";
import Column from "./Column";

type KanbanBoardProps = {
  tasks: Task[];
};

const KanbanBoard = ({ tasks }: KanbanBoardProps) => {
  return (
    <div className="flex space-x-5">
      <Column
        title="Incomplete"
        tasks={tasks.filter((task) => task.isCompleted === false)}
      />
      <Column
        title="Completed"
        tasks={tasks.filter((task) => task.isCompleted === true)}
      />
      {/* <Column /> */}
    </div>
  );
};

export default KanbanBoard;
